# Russ Clicker
## A full-stack clicker game with a leaderboard, final project for csc337.
### "Russ" is the name of our professor, so we made the game based on him (we made a pixel art version of him).
[Video showcasing the final product](https://youtu.be/SOdRzc5M06A?si=FrQAeSGaTDsUH4Ag)


## Getting Started (For My Teammates):
1. Clone this repository to your local machine.
2. `cd` into the **Full-Stack-Clicker** directory.
3. `cd` into the **russ_clicker** directory.
4. `cd` into the **backend** directory.
5. Run `npm install express` within the **backend**
    directory - don't worry about the node files, I have put them in the .gitignore.
6. Make sure you have MongoDB Community installed, and if using windows, install mongosh too,
because it is not automatically included. Instructions for all of this [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/).
7. Start up the database on Mac using `brew services start mongodb-community@8.0`. If on Windows:
    1. Open the command interpreter as an Administrator. Then, If you haven't already, create the database directory by doing `cd C:\` and then `md "\data\db"`.
    2. Run mongod.exe by doing `C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="c:\data\db`.
    3. If done correctly, you should see `[initandlisten] waiting for connections`.
8. Run `npm install mongoose` to install mongoose.
9. Run `node server.js` within the **backend** directory.
10. Copy and paste the ip you got from starting the node server into your browser, this should bring you to index.html, which is the login page.
11. You can initially login with the username "pointcollector" and email "pointcollector@gmail.com" for testing. Feel free to register and login with new usernames, this will add users to your local database.
12. Monitor the database frequently and carefully using **mongosh** if you are working with it. To do this, after you start up the database, run `mongosh mongodb://127.0.0.1/russ_clicker_db`. Additionally once you are in **mongosh**, `db.getCollection('userobjs').deleteMany({})` to delete all user documents in the userobjs collection is useful, `db.getCollection('userobjs').countDocuments()` for counting how many documents are in the userobjs collection is also useful.

## How To Contribute (For My Teammates):
In short: make a seperate branch for whatever new feature you are building, then make a pull request to merge into main when the feature is fully implemented.
The steps for developing a new feature are as follows:

1. Open up the terminal tab within Visual Studio Code on the bottom while you are in the project directory, also open up the "Source Control" tab on the left.
2. Make sure you are initially on the main branch by running `git checkout main` (the `checkout` command is kind of like `cd`, but for branches, it moves you to the specified branch).
3. Make a new branch for the feature you are working on, by running `git branch branch_name` (replace "branch_name" with what you want to name your branch, probably something related to the feature you want to implement).
4. Now do `git checkout branch_name` to move to the branch you just created.
5. You can make sure you are in the correct branch by running `git status`. You should also see the name of your current branch on the bottom of the Source Control tab on the the left of your screen.
6. Now you can work on your feature! 
7. After you make your commits, under the Source Control tab, there should be a button that says "Publish Branch". This will add your new branch to the remote repository, but will not merge it into the main branch yet. This is good, so go ahead and do that.  
8. Now make your way to this GitHub repository. Around the top left of the repository, you should see an icon with 3 circles and two lines connecting them, with "main" next to it. Click on this, and under "Branches", select your new branch that you just added to the repo.
9. On the right hand side, there should be a button that says "Contribute". Click on that, and then on "Open pull request". 
10. Describe the feature you are trying to merge, and then hit "Create pull request". 
11. You now may have to resolve some merge conflicts, or you might not. We will practice this. Let the rest of us know when you have created a pull request so we can all go over the code and make sure everything is good, then we will merge.  



