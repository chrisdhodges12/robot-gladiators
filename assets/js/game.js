//generate random number function 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Conditional Recursive Function Call
if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  
    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.playerMoney = playerInfo.money - 10;
        
        //return true if player wants to leave
        return true;
      }
    }
    return false;
  };

//FIGHT FUNCTION
var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {
        // Ask players if they would like to fight or skip
        if (fightOrSkip()) {
            //if true, leave fight by breaking loop
            break;
        }
        // Generate random damage value based on player's attack power.    
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + "." + enemy.name + " now has " + enemy.health + " health remaining. "
        );

        // Check enemy health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

        //award player money for winning
        playerInfo.money = playerInfo.money + 20;

        //Leave while() loop since enemy is dead    
        break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
    
        //Subtract the value of 'enemyAttack' from players health
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
        );

        //Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            //leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }  
    }       
};

// function to start the game
var startGame = function() {
    //reset player stats
    playerInfo.reset

    //fight each enemy by looping over them and fighting one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
        //if player is alive, keep fighting
        if (playerInfo.health > 0) {
            //alert round # (use array which starts at 0 --> needs the +1)
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

            //Pick new enemy to fight based on array index
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy health at begin of round
            pickedEnemyObj.health = randomNumber(40, 60);

            //pass new enemy name into fight function 
            fight(pickedEnemyObj);

            //if player is alive, not at the last enemy in array
            if ( playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0){
        window.alert("Great job! You've survived the game! You now have a score of " + playerInfo.money + ".");
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

    //use switch to carry out function
    switch (shopOptionPrompt){
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;              
        case "upgrade": 
        case "UPGRADE":
            playerInfo.upgradeAttack();
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

 //END GAME FUNCTIONS

//function to set name
var getPlayerName = function() {
    var name = "";

while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
    }
    console.log ("your robot's name is " + name);
    return name;
};

 // player and enemy info
var playerInfo = {
    name: getPlayerName(),
    health: 100, 
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7){
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 6;
        this.money -= 7;
    } 
    else {
        window.alert("You don't have enough money!");
    }
},    
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert ("You don't have enough money!");
        }
    }
};

//Enemy information
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    } 
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

//END GAME INFORMATION / VARIABLES

 //RUN GAME
startGame();