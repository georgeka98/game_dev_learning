///////////////////////////////////////////////////////////////////////
//                                                   41 Post                                       //
// Unity3D: Programming a machine gun post series                                //
// Created by DimasTheDriver in 02/Feb/2010                                      //
// Part of 'Unity3D: Programming a machine gun - Part 1' post.               //
// Availiable at:      http://www.41post.com/?p=2831                             //
/////////////////////////////////////////////////////////////////////

using UnityEngine;
using System.Collections;

public class MachineGunCoroutine : MonoBehaviour 
{
	//A variable that will count how many bullets were shot
	private int counter = 0;
	
	// Update is called once per frame
	void Update () 
	{
		//while the "Fire1" button is being held down
		if(Input.GetButton("Fire1"))
		{
			//Start the DelayedShot method as a coroutine
			StartCoroutine("DelayedShot",0.2f);
		}
	}
	
	//A method that returns a IEnumerator so it can be yield
	IEnumerator DelayedShot(float delay)
	{
		//wait for the time defined at the delay parameter
		yield return new WaitForSeconds(delay);
		//display how many bullets were shot
		Debug.Log(counter);
		//increase the number of fired bullets
		counter++;
		//Stop this coroutine
		StopCoroutine("DelayedShot");
	}
}
