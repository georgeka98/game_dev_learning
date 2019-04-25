// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class coverPropertiesC : MonoBehaviour {

	public bool availability= false;
	public GameObject player;
	public GameObject enemy;

	void  Start (){

	}

	void  Update (){
	    float playerAndCoverDistance= Vector3.Distance(transform.position, player.transform.position);
		float enemyAndCoverDistnance= Vector3.Distance(transform.position, enemy.transform.position);

		if ((playerAndCoverDistance <= 5) || (enemyAndCoverDistnance <= 1)){
			SendMessage("CoverSystem", availability, SendMessageOptions.DontRequireReceiver);
			availability = false;
		}
		else{
			availability = true;
		}
	}
}