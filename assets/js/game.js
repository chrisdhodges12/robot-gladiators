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

var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            //debugger
            fight(pickedEnemyName);
            if ( playerHealth > 0 && i < enemyNames.length - 1){
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm){
                shop();
                }
            }
        }
        else {
            window.alert ("You have lost the robot battle! Game Over!");
            break;
        }
    }
    endGame();
};
// function to end game
var endGame = function() {
        //if player is still alive, they win!
        if (playerHealth > 0){
           window.alert("Great job! You've survived the game! You now have a score of " + playerMoney + ".");
        }
        else {
        window.alert("You have lost the robot battle.");
        }
        //ask player if they'd like to play again
        var playAgainConfirm = window.confirm("Would you like to play again?");
        if (playAgainConfirm) {
            //restart game
            startGame();
        }
        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }   
};
var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    //use switch to carry out fuction
    switch (shopOptionPrompt){
        case "refill":
        case "REFILL":
            if (playerMoney >= 7){
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
                break;
            default: 
                window.alert("You did not pick a valid option. Try again.");
                //call shop() again to force player to pick valid option
                shop();
                break; 
    }
 };
startGame()