#pragma strict

var health = 50;
var player:GameObject;
var EnemyDamage = 10;
var bulletHoleObject:GameObject;
var ShootPoint:GameObject; //The point where the enemy will shoot
var effect: Transform;
var currentTime: float;

var enemyShootCount = 0;
var IfGetNumberOfShootsCalled = false;
var numberOfShoots:int;

//weapon
var clip:int;
var cover:GameObject;
var RandomShoot:Vector3; //Will add that random vector value to UserPlayer position, to randomise the shoots from the enemies.
var Shot:RaycastHit;

//Enemy cover system
var LoockedForTheFirstTime = false;

//Enemy navigation (nav mesh properties)
var agent: UnityEngine.AI.NavMeshAgent;
var UserPlayerPosition:Vector3; //get the position of the player so the enemy will shoot him

function DeductPoints(WeaponDamage: int){
	health = health - WeaponDamage;
}

function Start(){
	clip = 30;
	agent = GetComponent(UnityEngine.AI.NavMeshAgent);
	currentTime = Time.time;
}

function ShootRoutine(){
	var particleClone = Instantiate(effect, Shot.point, Quaternion.FromToRotation(Vector3(0,0,0),Shot.normal));
	Destroy(particleClone.gameObject, 2);

	if (!Shot.collider.gameObject.tag == "Player"){
		var bulletHole = Instantiate(bulletHoleObject, Shot.point, Quaternion.FromToRotation(Vector3.up, Shot.normal));
		Destroy(bulletHole.gameObject, 60);
	}
	Debug.DrawRay(ShootPoint.transform.position, UserPlayerPosition * 1000, Color.red);
	enemyShootCount = enemyShootCount + 1;
	clip = clip - 1;

	GetComponent.<AudioSource>().Play();

	if (Shot.collider.gameObject.tag == "Player"){
		Shot.transform.SendMessage("UserPlayerHealth" ,EnemyDamage ,SendMessageOptions.DontRequireReceiver);
	}
	currentTime = Time.time;
}

function Update () {

	var PointToPlayer:RaycastHit;
	UserPlayerPosition = player.transform.position - transform.position;
	//Debug.DrawRay(transform.position, UserPlayerPosition * 1000, Color.red);
	var distanceBetweenEnemyAndPlayer = Vector3.Distance (transform.position, player.transform.position); //The distance between the player and the enemy
	var EnemyAndClosestCoverDistance = Vector3.Distance(transform.position, cover.transform.position); //The distance between the enemy and the cover (We use it to get the closest distance between an enemy and a cover)

	// Shooting properties && ammo with reload

	//covering
	if (distanceBetweenEnemyAndPlayer <= 50 || LoockedForTheFirstTime == true){
		if ((EnemyAndClosestCoverDistance < 50 || LoockedForTheFirstTime == true) && cover.GetComponent(coverProperties).availability == true){ //Checks if the distance between a cover point and a bot is less than 50
//				transform.position = Vector3.MoveTowards(transform.position, cover.transform.position, Time.deltaTime*7); //moves the bot directly to the cover point
			agent.SetDestination(cover.transform.position);
			LoockedForTheFirstTime = true;
		}
	}
	//---end of covering---

	if (distanceBetweenEnemyAndPlayer <= 35){
		gameObject.GetComponent(Renderer).material.color = Color.red;
	}
	else {
		gameObject.GetComponent(Renderer).material.color = Color.white;
	}

	//Shooting properties

	if ((Time.time - currentTime >= 0.1) && (Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition, Shot)) && distanceBetweenEnemyAndPlayer <= 50){
		Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition, PointToPlayer); //Creates a Ray which points the Player all the time.
		if (PointToPlayer.collider.gameObject.tag == "Player"){ //checks if the PointToPlayer points on the Player (
			//The above if statement is useful because we want the bot to shoot the player only when the PointToPlayer is pointing on the player only.
			if (clip <= 0){
				currentTime = Time.time + 2.5;
				enemyShootCount = 0;
				IfGetNumberOfShootsCalled = false;
				clip = 30;
			}
			if (IfGetNumberOfShootsCalled == false){
				numberOfShoots = GetNumberOfShoots();
				IfGetNumberOfShootsCalled = true;
			}
			Debug.Log("enemyShootCount is " + enemyShootCount.ToString()  + " and numberOfShoots is " + numberOfShoots.ToString());
			if (enemyShootCount <= numberOfShoots){
				RandomShoot = Vector3(Random.Range(Shot.distance/(-10),Shot.distance/10),Random.Range(Shot.distance/(-10),Shot.distance/10),0);
				//Actual shooting
				if(Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition - RandomShoot, Shot)){
					Physics.Raycast(transform.position, UserPlayerPosition, PointToPlayer); //Creates a Ray which points the Player all the time.
					if (PointToPlayer.collider.gameObject.tag == "Player"){ //checks if the PointToPlayer points on the Player (
					//The above if statement is useful because we want the bot to shoot the player only when the PointToPlayer is pointing on the player only.
						StartCoroutine("ShootRoutine");
					}
				}
				//----End of actual shooting----
			}
			if (enemyShootCount == numberOfShoots){
				currentTime = Time.time + 0.5;
				enemyShootCount = 0;
				IfGetNumberOfShootsCalled = false; //enabling access to the second if statement, so we can call the GetNumberOfShoots function
			}
		}
	}

	//----End of shooting properties---

	if (health <= 0){
		Destroy(gameObject);
	}
}

function GetNumberOfShoots(){
	return Random.Range(5,15);
}