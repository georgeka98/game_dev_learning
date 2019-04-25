// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class ballroll : MonoBehaviour {


	IEnumerator ballrollRoutine(){
		while (Vector3.Distance(transform.position, new Vector3(155,0.5f,340)) > 0.05f){
			transform.position = Vector3.Lerp(transform.position, new Vector3(155,0.5f,340), Time.deltaTime);
			yield return null;
		}
	}

	void  Start (){
		//StartCoroutine("ballrollRoutine");
	}

	void Update(){
		if (Input.GetKey(KeyCode.Mouse0)){
			StartCoroutine("ballrollRoutine");
		}
	}
}