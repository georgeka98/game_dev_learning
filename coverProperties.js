#pragma strict
var availability = false;
var player:GameObject;
var enemy:GameObject;

function Start () {

}

function Update () {
	var playerAndCoverDistance = Vector3.Distance(transform.position, player.transform.position);
	var enemyAndCoverDistnance = Vector3.Distance(transform.position, enemy.transform.position);

	if ((playerAndCoverDistance <= 5) || (enemyAndCoverDistnance <= 1)){
		SendMessage("CoverSystem", availability, SendMessageOptions.DontRequireReceiver);
		availability = false;
	}
	else{
		availability = true;
	}
}