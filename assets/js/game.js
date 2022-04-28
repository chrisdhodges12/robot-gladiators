//global variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//generate random number function 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

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
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney)
                break;
            }    
        }
           
       
        // Generate random damage value based on player's attack power.    
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
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
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
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
// function to start the game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    //fight each enemy by looping over them and fighting one at a time
    for(var i = 0; i < enemyNames.length; i++) {
        //if player is alive, keep fighting
        if (playerHealth > 0) {
            //alert round # (use array which starts at 0 --> needs the +1)
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

            //Pick new enemy to fight based on array index
            var pickedEnemyName = enemyNames[i];

            //reset enemy health at begin of round
            enemyHealth = randomNumber(40, 60);

            //pass new enemy name into fight function 
            fight(pickedEnemyName);

            //if player is alive, not at the last enemy in array
            if ( playerHealth > 0 && i < enemyNames.length - 1){
                
                //ask if player would like to visit the store 
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm){
                //if yes, visit shop
                shop();
                }
            }
        }
        //if player is not alive, break out of the loop and run endGame()
        else {
            window.alert ("You have lost the robot battle! Game Over!");
            break;
        }
    }
    // endGame function when playerhealth = 0 or no more enemies to fight 
    endGame();
};
// function to end entire game
var endGame = function() {
        window.alert ("The game has now ended. Let's see how you did!");

        //if player is still alive, player win!
        if (playerHealth > 0){
           window.alert("Great job! You've survived the game! You now have a score of " + playerMoney + ".");
        } else {
        window.alert("You have lost the robot battle.");
        }

        //ask player if they'd like to play again
        var playAgainConfirm = window.confirm("Would you like to play again?");
       
        if (playAgainConfirm) {
            //restart game
            startGame();
        } else {
            window.alert("Thank you for playing Robot Gladiators! Goodbye!");
        }   
};

//Go to shop between battle function
var shop = function() {
    //ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out fuction
    switch (shopOptionPrompt){
        case "refill":
        case "REFILL":
            if (playerMoney >= 7){
                
                //increase health, decrease money
                window.alert("Refilling player's health by 20 for -7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money.");
            }
            break;
        case "upgrade": 
        case "UPGRADE":
            if (playerMoney >= 7) { 
                window.alert ("Upgrading player's attack by 6 for -7 dollars");
                
                //increase attack, decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money.");
            }
                break;
        case "leave":
        case "LEAVE":
                window.alert("Leaving the store.");
                //do nothing so function will end
                break;
            default: 
                window.alert("You did not pick a valid option. Try again.");

                //call shop() again to force player to pick valid option
                shop();
                break; 
    }
 };

 //Start fist game when page loads
startGame()