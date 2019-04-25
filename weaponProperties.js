#pragma strict

var check:int;
var Position_back : GameObject; //the position of the empty object.

var zoom : float = 40.0;
var normal : float = 60.0;
var zoom_if_pressed = false;
var aiming = false;
var aimGunMovement = false;
var UnAimGunMovement = false;
var WeaponDamage = 10;

var runned_while_aiming = false;
var ShootingPosition:GameObject;
var effect: Transform;
var bulletHoleObject: GameObject;
var delay = 0.04;
var counter = 0.0;

//gun movement
var gun_movement : float = 0.00001;
var gun_movement_y : float = 0.00001;

//if weapon shooted (this is to do the animated movement of gun when shooting)
var weaponShooted = false;
var curTime: float;
var elapsed = 0.0;

//weapon animating
public var firing:boolean;  //Is the gun Firing? Use Your script to turn this true to start the animation          and false to stop it
public var MaxFront:float = 0.5;//Maximum front position
public var MaxBack:float = 0.0;//Maximum back position
public var AnimationSpeed:float = 0.001;//The speed the gun should move
private var firePosition:float = 0.0;
private var ReverseAnimation:float = 0.0;

var smooth : float = 20.0;
var timeStartupincrease = 0f;

function Start () {
	check = 2;
	curTime = Time.time;
	ReverseAnimation -= AnimationSpeed; //Sets reverseAnimation to -AnimationSpeed
}

//All routines

function shootRoutine(delay: float){  
//	yield new WaitForSeconds(delay);
	Debug.DrawRay(ShootingPosition.transform.position, ShootingPosition.transform.TransformDirection(Vector3(90,0,0))*1000, Color.green);

//	if (aiming == true){
//
//	}
//	else if (aiming == false){
//
//	}

	weaponShooted = true;
	var Shot:RaycastHit;
	var fwd = ShootingPosition.transform.TransformDirection(Vector3(90,0,0));
	Debug.DrawRay(ShootingPosition.transform.position, fwd*1000, Color.green);
	this.GetComponent.<AudioSource>().Play();

	if(Physics.Raycast(ShootingPosition.transform.position, fwd, Shot)){
		var particleClone = Instantiate(effect, Shot.point, Quaternion.FromToRotation(Vector3(0,0,0),Shot.normal));
		Destroy(particleClone.gameObject, 2);

		firing = true;

		if (!Shot.collider.gameObject.tag == "enemy"){
			var bulletHole = Instantiate(bulletHoleObject, Shot.point, Quaternion.FromToRotation(Vector3.up, Shot.normal));
			Destroy(bulletHole.gameObject, 60);
		}

		Shot.transform.SendMessage("DeductPoints", WeaponDamage, SendMessageOptions.DontRequireReceiver);
	}

	StopCoroutine("shootRoutine");
		//shoot movement
//	if (weaponShooted){
//		transform.localPosition = Vector3.MoveTowards(initialPosition, targetPosition, Time.deltaTime*100);
//		transform.localPosition = Vector3.MoveTowards(targetPosition, initialPosition, Time.deltaTime*1000);
//		weaponShooted = false;
//	}
}

function Animate(){
	
    for(; firePosition > MaxFront; firePosition += AnimationSpeed){
         transform.Translate(AnimationSpeed,0,0);
         print("Animate");
    }
    for(; firePosition < MaxBack; firePosition -= AnimationSpeed){
         transform.Translate(ReverseAnimation,0,0);
    }
}

 function FixedUpdate(){
     //Execute Movements here 
    if(firing){
       Animate();//Calls the Animate function
      }
 }

function aim(){
	if(Input.GetButtonDown("Fire2") && check % 2 == 0){
		//StopCoroutine(GunAnimateRoutine(Position_back));
		print("Hello");
		transform.Rotate(0,0,0);
		transform.localPosition = Vector3(0,-0.275,0.15);
		zoom_if_pressed = false;
		aiming = true;
		check = check + 1;
	}
	else if(Input.GetButtonDown("Fire2") && check % 2 == 1){
		//StopCoroutine(GunAnimateRoutine(Position_back));
		print("Hello again");
		transform.Rotate(0,0,0);
		transform.localPosition = Position_back.transform.localPosition;
		check = check + 1;
		zoom_if_pressed = true;
		aiming = false;
	}
}

//-----end of all routines---

function Update () {
	// aiming
	counter = counter + Time.deltaTime;
	if(!(Input.GetKey("w") && Input.GetKey("left shift"))){

		// aim
		aim();
		//shoot();

		if (counter >= delay && Input.GetKey(KeyCode.Mouse0)){
			StartCoroutine("shootRoutine",0.1);
			counter = 0;
		}
		else if (!Input.GetKey(KeyCode.Mouse0)){
			firing = false;
		}
	}

	if (aiming == false){
		aimGunMovement = false;
		if (UnAimGunMovement == false){
			transform.localPosition = Vector3(0.17,-0.4,0.92);
			gun_movement = 0.0001;
			gun_movement_y = 0.0001;
			UnAimGunMovement = true;
		}
		transform.position.x -= gun_movement;
		gun_movement = gun_movement - 0.0000005;
		transform.position.y -= gun_movement_y;
		gun_movement_y = gun_movement_y - 0.000001;
		if(gun_movement_y <= -0.0001){
			gun_movement_y = 0.0001;
		}
		if(gun_movement <= -0.0001){
			gun_movement = 0.0001;
		}
	}
	else if (aiming == true){
		UnAimGunMovement = false;
		if (aimGunMovement == false){
			transform.localPosition = Vector3(0,-0.275,0.15);
			gun_movement = 0.00001;
			gun_movement_y = 0.00001;
			aimGunMovement = true;
		}
		transform.position.x -= gun_movement;
		gun_movement = gun_movement - 0.00000005;
		transform.position.y -= gun_movement_y;
		gun_movement_y = gun_movement_y - 0.0000001;
		if(gun_movement_y <= -0.00001){
			gun_movement_y = 0.00001;
		}
		if(gun_movement <= -0.00001){
			gun_movement = 0.00001;
		}
	}

	if (check % 2 == 1){
		GetComponentInParent(Camera).fieldOfView = Mathf.Lerp(GetComponentInParent(Camera).fieldOfView,zoom,Time.deltaTime*smooth);

	}
	else if(check % 2 == 0){
		runned_while_aiming = false;
		GetComponentInParent(Camera).fieldOfView = Mathf.Lerp(GetComponentInParent(Camera).fieldOfView,normal,Time.deltaTime*smooth);
	}

	if (Input.GetKey("w") && Input.GetKey("left shift")){
		transform.localRotation= Quaternion.Euler(Vector3(0,-180,-25));
		transform.localPosition = Vector3(0.17,-0.4,0.92);
		zoom_if_pressed = true;
		if (GetComponentInParent(Camera).fieldOfView < 60){
			GetComponentInParent(Camera).fieldOfView = 60; //returning the zoom back to 60 if it's value has been altered
			check = 2;
		}
	}
	else{
		if (zoom_if_pressed) {
			transform.localRotation = Quaternion.Euler(Vector3(0,-90,0));
//			transform.localPosition =  Position_back.transform.localPosition;
		}
	}
	//GunMoveWhenFire();
}

function GunMoveWhenFire(){
	elapsed = Time.time - curTime;
	if (elapsed < 10.0){
		transform.localPosition = Vector3.MoveTowards(transform.localPosition, Vector3(0.6, 0.6, 1), Time.deltaTime/10);
	}
	if (elapsed >= 10.0){
		transform.localPosition = Vector3.MoveTowards(transform.localPosition, Vector3(0,0,0), Time.deltaTime/10);
	}
}