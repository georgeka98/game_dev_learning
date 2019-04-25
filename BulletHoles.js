#pragma strict

var time: float;
var currentTime: float;

function Start () {
	time = Time.time;
	currentTime = Time.time;
}

function Update () {
	if (Time.time-currentTime >= 0.09){
		GetComponent(BoxCollider).enabled = false;
		currentTime = Time.time;
	}
	print(Time.time);
}