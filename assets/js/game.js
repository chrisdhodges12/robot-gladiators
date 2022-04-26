var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//FIGHT FUNCTION
var fight = function(enemyName) {
    
    while(playerHealth > 0 && enemyHealth > 0) {
        // Ask players if they would like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose. ");

        // If player chooses to skip, confirm and then stop the loop.
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! Goodbye!");
                //Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }    
        }
           
        // Remove enemy's health by subtracting the amount set in the playerAttack variable.    
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + "." + enemyName + " now has " + enemyHealth + " health remaining. "
        );

        // Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

        //award playerplayer money for winning
        playerMoney = playerMoney + 20
        //Leave while() loop since enemy is dead    
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
    
        //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
        );

        //Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            //leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
       
    }       
};

for(var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        //debugger
        //call fight function with the enemy-robot
        fight(pickedEnemyName);
    }
    else {
        window.alert ("You have lost the robot battle! Game Over!");
        break;
    }
}
