///////////////////////////////////////////////////////////////////////
//                                                   41 Post                                       //
// Unity3D: Programming a machine gun post series                                //
// Created by DimasTheDriver in 02/Feb/2010                                      //
// Part of 'Unity3D: Programming a machine gun - Part 1' post.               //
// Availiable at:      http://www.41post.com/?p=2831                             //
/////////////////////////////////////////////////////////////////////

//A variable that will count how many bullets were shot
private var counter:int = 0;

function Update () 
{
	//If the "Fire1" button is down
	if(Input.GetButtonDown("Fire1"))
	{
		//Shoot the bullet
		Shoot();
		//Cancel any Shoot() method code execution
		CancelInvoke("Shoot");
	}
	
	//while the "Fire1" button is being pressed
	if(Input.GetButton("Fire1") && !IsInvoking("Shoot"))
	{
		//Execute the Shoot() method in the next 0.2 seconds.
		Invoke("Shoot",0.2);
	}
	
	//If the "Fire1" has been released, cancel any scheduled Shoot() method executions	
	if(Input.GetButtonUp("Fire1"))
	{
		//Cancel any Shoot() method code execution
		CancelInvoke("Shoot");
	}
}

//The shoot method, basically it increments the counter,
function Shoot()
{
	//display how many bullets were shot
	Debug.Log(counter);
	//increase the number of fired bullets
	counter++;
}