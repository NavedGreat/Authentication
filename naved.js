const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema)

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    });
});


app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
});


// register async await 

app.post("/register", async function(req, res) {
    try {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });

        await newUser.save();
        res.render("secrets");
    } catch (err) {
        console.log(err);
    }
});

// login async await
app.post("/login", async function(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const foundUser = await User.findOne({ email: username });

        if (foundUser && foundUser.password === password) {
            res.render("secrets");
        }
    } catch (err) {
        console.log(err);
    }
});