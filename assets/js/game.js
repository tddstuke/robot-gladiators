// game states
// "win" - player robot has defeated all enemy-robots
// * Fight all enemy-robots
// *defeat each enemy-robot
// "lose" - Player robot's health is zero or less

var fight = function (enemyInfo) {
  // repeat and execute as long as the enemy robot is alive
  while (playerInfo.health > 0 && enemyInfo.health > 0) {
    // alert players that they are starting the round
    var promptFight = window.prompt(
      "would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    // if player chooses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(
          playerInfo.name + " has decided to skip this fight. Goodbye!"
        );
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    //   subtract the value of 'playerInfo.attack' from the value of 'enemyInfo.health' and use that result to update the value in the 'enemyInfo.health' variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemyInfo.health = Math.max(0, enemyInfo.health - damage);
    // Log a resulting message to the consoleso we know that it worked
    console.log(
      playerInfo.name +
        " attacked " +
        enemyInfo.name +
        ". " +
        enemyInfo.name +
        " now has " +
        enemyInfo.health +
        " health remaining."
    );

    // check enemy's health
    if (enemyInfo.health <= 0) {
      window.alert(enemyInfo.name + " has died!");
      break;
    } else {
      window.alert(
        enemyInfo.name + " still has " + enemyInfo.health + " health left."
      );
    }

    // Subtract the value of 'enemyInfo.attack' from the value of 'playerInfo.health'and use that result  to update the value in 'playerInfo.health' variable
    var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // log a resulting message to the console so we know that it worked
    console.log(
      enemyInfo.name +
        " attacked " +
        playerInfo.name +
        ". " +
        playerInfo.name +
        " now has " +
        playerInfo.health +
        " health remaining"
    );

    //   check players health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(
        playerInfo.name + " still has " + playerInfo.health + " health left."
      );
    }
  }
};

// function to start a game
var startGame = function () {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);
      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round?"
        );
        // if yes take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  // after the loop ends, player is either out of health or enemies to fight so run endgame function
  endGame();
};

var endGame = function () {
  // if player is still alive player wins!
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  //  ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE' or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop agian to force player to pick a valid option
      shop();
      break;
  }
};

var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars");

      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

// start the game when page loads
startGame();
