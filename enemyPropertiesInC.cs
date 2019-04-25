// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class enemyPropertiesInC : MonoBehaviour {


	public int health= 50;
	public GameObject player;
	public int EnemyDamage= 10;
	public GameObject bulletHoleObject;
	public GameObject ShootPoint; //The point where the enemy will shoot
	public Transform effect;
	public float currentTime= Time.time;

	public int enemyShootCount= 0;
	public bool IfGetNumberOfShootsCalled= false;
	public int numberOfShoots;

	//weapon
	public int clip;
	public GameObject cover;

	//Enemy cover system
	public bool LoockedForTheFirstTime= false;

	//Enemy navigation (nav mesh properties)
	public UnityEngine.AI.NavMeshAgent agent;
	public Vector3 RandomShoot;

	void  DeductPoints ( int WeaponDamage  ){
		health = health - WeaponDamage;
	}

	void  Start (){
		clip = 30;
		agent = GetComponent<UnityEngine.AI.NavMeshAgent>();
	}

	void  Update (){

		RaycastHit Shot;
		RaycastHit PointToPlayer;
		Vector3 UserPlayerPosition = player.transform.position - transform.position;
		//Debug.DrawRay(transform.position, UserPlayerPosition * 1000, Color.red);
		float distanceBetweenEnemyAndPlayer= Vector3.Distance (transform.position, player.transform.position); //The distance between the player and the enemy
		float EnemyAndClosestCoverDistance= Vector3.Distance(transform.position, cover.transform.position); //The distance between the enemy and the cover (We use it to get the closest distance between an enemy and a cover)

		// Shooting properties && ammo with reload

		//covering
		if (distanceBetweenEnemyAndPlayer <= 50 || LoockedForTheFirstTime == true){
			if ((EnemyAndClosestCoverDistance < 50 || LoockedForTheFirstTime == true) && cover.GetComponent<coverPropertiesC>().availability == true){ //Checks if the distance between a cover point and a bot is less than 50
				//			transform.position = Vector3.MoveTowards(transform.position, cover.transform.position, Time.deltaTime*7); //moves the bot directly to the cover point
				agent.SetDestination(cover.transform.position);
				LoockedForTheFirstTime = true;
			}
		}
		//---end of covering---

		if (distanceBetweenEnemyAndPlayer <= 35){
			gameObject.GetComponent<Renderer>().material.color = Color.red;
		}
		else {
			gameObject.GetComponent<Renderer>().material.color = Color.white;
		}

		//Shooting properties

		if ((Time.time - currentTime >= 0.1f) && (Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition,out Shot)) && distanceBetweenEnemyAndPlayer <= 50){
			Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition, out PointToPlayer); //Creates a Ray which points the Player all the time.
			if (PointToPlayer.collider.gameObject.tag == "Player"){ //checks if the PointToPlayer points on the Player (
				//The above if statement is useful because we want the bot to shoot the player only when the PointToPlayer is pointing on the player only.
				if (clip <= 0){
					currentTime = Time.time + 2.5f;
					enemyShootCount = 0;
					IfGetNumberOfShootsCalled = false;
					clip = 30;
				}
				if (IfGetNumberOfShootsCalled == false){
					numberOfShoots = GetNumberOfShoots();
					IfGetNumberOfShootsCalled = true;
				}
				if (enemyShootCount <= numberOfShoots){
					print("Hello");
					RandomShoot = new Vector3(Random.Range(Shot.distance/(-10),Shot.distance/10),Random.Range(Shot.distance/(-10),Shot.distance/10),0); //The new keyword is useful because we are updating the value RandomShoot
					//Actual shooting
					if(Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition - RandomShoot, out Shot)){
						Physics.Raycast(transform.position, UserPlayerPosition, out PointToPlayer); //Creates a Ray which points the Player all the time.
						if (PointToPlayer.collider.gameObject.tag == "Player"){ //checks if the PointToPlayer points on the Player (
							//The above if statement is useful because we want the bot to shoot the player only when the PointToPlayer is pointing on the player only.
//							GameObject particleClone = Instantiate(effect, Shot.point, Quaternion.FromToRotation(new Vector3(0,0,0),Shot.normal)) as GameObject;
//							Destroy(particleClone.gameObject, 2);
//
//							if (!(Shot.collider.gameObject.tag == "Player")){
//								GameObject bulletHole = Instantiate(bulletHoleObject, Shot.point, Quaternion.FromToRotation(Vector3.up, Shot.normal)) as GameObject;
//								Destroy(bulletHole.gameObject, 60);
//							}
							GetComponent<AudioSource>().Play();
							print ("EXECUTED");
							Debug.DrawRay(ShootPoint.transform.position, UserPlayerPosition * 1000, Color.red);
							enemyShootCount = enemyShootCount + 1;
							clip = clip - 1;

							if (Shot.collider.gameObject.tag == "Player"){
								Shot.transform.SendMessage("UserPlayerHealth" ,EnemyDamage ,SendMessageOptions.DontRequireReceiver);
							}
							currentTime = Time.time;
						}
					}
					//----End of actual shooting----
				}
				if (enemyShootCount == numberOfShoots){
					currentTime = Time.time + 0.5f;
					enemyShootCount = 0;
					IfGetNumberOfShootsCalled = false; //enabling access to the second if statement, so we can call the GetNumberOfShoots function
				}
				print(clip);
			}
		}

		//----End of shooting properties---

//		//Actual shooting
//		if(Physics.Raycast(ShootPoint.transform.position, UserPlayerPosition - RandomShoot, out Shot) && distanceBetweenEnemyAndPlayer <= 50){
//			Physics.Raycast(transform.position, UserPlayerPosition, out PointToPlayer); //Creates a Ray which points the Player all the time.
//			if (PointToPlayer.collider.gameObject.tag == "Player"){ //checks if the PointToPlayer points on the Player (
//				//The above if statement is useful because we want the bot to shoot the player only when the PointToPlayer is pointing on the player only.
//				GameObject particleClone = Instantiate(effect, Shot.point, Quaternion.FromToRotation(new Vector3(0,0,0),Shot.normal)) as GameObject;
//				Destroy(particleClone.gameObject, 2);
//
//				if (!(Shot.collider.gameObject.tag == "Player")){
//					GameObject bulletHole = Instantiate(bulletHoleObject, Shot.point, Quaternion.FromToRotation(Vector3.up, Shot.normal)) as GameObject;
//					Destroy(bulletHole.gameObject, 60);
//				}
//				GetComponent<AudioSource>().Play();
//				print ("EXECUTED");
//
//				if (Shot.collider.gameObject.tag == "Player"){
//					Shot.transform.SendMessage("UserPlayerHealth" ,EnemyDamage ,SendMessageOptions.DontRequireReceiver);
//				}
//				currentTime = Time.time;
//			}
//		}
//		//----End of actual shooting----

		if (health <= 0){
			Destroy(gameObject);
		}
	}

	int GetNumberOfShoots (){
		return Random.Range(5,15);
	}
}