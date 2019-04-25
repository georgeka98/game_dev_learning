#pragma strict

var health = 1000;

function UserPlayerHealth(EnemyDamage: int) {
	health = health - EnemyDamage;
	print(health);
}

function Update () {
	if (health <= 0){
		Destroy(gameObject);
	}
}