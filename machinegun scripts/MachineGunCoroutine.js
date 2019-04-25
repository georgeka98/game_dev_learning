///////////////////////////////////////////////////////////////////////
//                                                   41 Post                                       //
// Unity3D: Programming a machine gun post series                                //
// Created by DimasTheDriver in 02/Feb/2010                                      //
// Part of 'Unity3D: Programming a machine gun - Part 1' post.               //
// Availiable at:      http://www.41post.com/?p=2831                             //
/////////////////////////////////////////////////////////////////////

//A variable that will count how many bullets were shot
private var counter:int = 0;

// Update is called once per frame
function Update () 
{
	//while the "Fire1" button is being held down
	if(Input.GetButton("Fire1"))
	{
		//Start the DelayedShot method as a coroutine
		StartCoroutine("DelayedShot",0.2);
	}
}
//A method that returns a IEnumerator so it can be yield
function DelayedShot(delay:float)
{

	//display how many bullets were shot
	Debug.Log(counter);
	//increase the number of fired bullets
	counter++;
	//Play the fire audio from audio source
	GetComponent(AudioSource).Play();
	//wait for the time defined at the delay parameter
	yield new WaitForSeconds(delay);
	//Stop this coroutine
	StopCoroutine("DelayedShot");
}

//function shoot(){
//	Debug.DrawRay(ShootingPosition.transform.position, ShootingPosition.transform.TransformDirection(Vector3(90,0,0))*1000, Color.green);
//	counter = counter + Time.deltaTime;
//
//	if (aiming == false){
//		aimGunMovement = false;
//		if (UnAimGunMovement == false){
//			transform.localPosition = Vector3(0.17,-0.4,0.92);
//			gun_movement = 0.0001;
//			gun_movement_y = 0.0001;
//			UnAimGunMovement = true;
//		}
//		transform.position.x -= gun_movement;
//		gun_movement = gun_movement - 0.0000005;
//		transform.position.y -= gun_movement_y;
//		gun_movement_y = gun_movement_y - 0.000001;
//		if(gun_movement_y <= -0.0001){
//			gun_movement_y = 0.0001;
//		}
//		if(gun_movement <= -0.0001){
//			gun_movement = 0.0001;
//		}
//	}
//	else if (aiming == true){
//		UnAimGunMovement = false;
//		if (aimGunMovement == false){
//			transform.localPosition = Vector3(0,-0.275,0.15);
//			gun_movement = 0.00001;
//			gun_movement_y = 0.00001;
//			aimGunMovement = true;
//		}
//		transform.position.x -= gun_movement;
//		gun_movement = gun_movement - 0.00000005;
//		transform.position.y -= gun_movement_y;
//		gun_movement_y = gun_movement_y - 0.0000001;
//		if(gun_movement_y <= -0.00001){
//			gun_movement_y = 0.00001;
//		}
//		if(gun_movement <= -0.00001){
//			gun_movement = 0.00001;
//		}
//	}
//
//	if(Input.GetKey(KeyCode.Mouse0) && counter >= delay){
//		StopCoroutine(GunAnimateRoutine());
//		StartCoroutine(GunAnimateRoutine());
//	}
//
//	if(Input.GetKey(KeyCode.Mouse0) && counter >= delay){
//		weaponShooted = true;
//		var Shot:RaycastHit;
//		var fwd = ShootingPosition.transform.TransformDirection(Vector3(90,0,0));
//		Debug.DrawRay(ShootingPosition.transform.position, fwd*1000, Color.green);
//		this.GetComponent.<AudioSource>().Play();
//
//		if(Physics.Raycast(ShootingPosition.transform.position, fwd, Shot)){
//			var particleClone = Instantiate(effect, Shot.point, Quaternion.FromToRotation(Vector3(0,0,0),Shot.normal));
//			Destroy(particleClone.gameObject, 2);
//			
//
//			if (!Shot.collider.gameObject.tag == "enemy"){
//				var bulletHole = Instantiate(bulletHoleObject, Shot.point, Quaternion.FromToRotation(Vector3.up, Shot.normal));
//				Destroy(bulletHole.gameObject, 60);
//			}
//
//			Shot.transform.SendMessage("DeductPoints", WeaponDamage, SendMessageOptions.DontRequireReceiver);
//		}
//		counter = 0;
//	}
//		//shoot movement
////	if (weaponShooted){
////		transform.localPosition = Vector3.MoveTowards(initialPosition, targetPosition, Time.deltaTime*100);
////		transform.localPosition = Vector3.MoveTowards(targetPosition, initialPosition, Time.deltaTime*1000);
////		weaponShooted = false;
////	}
//}
