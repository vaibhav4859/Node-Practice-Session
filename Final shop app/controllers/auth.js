const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
  // User.findById("65df8347bf7b56a49aa1f54e")
  //   .then((user) => {
  //     console.log("user");
  //     req.session.isLoggedIn = true;
  //     req.session.user = user;
  //     req.session.save((err) => {
  //       // mongodb takes few miliseconds to save data within it so in some cases we can redirect too quickly before data is even written here for example session is created so in that cases we can use this save method then once data is stored successfully then redirect only
  //       console.log(err);
  //       res.redirect("/");
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // req.session.isLoggedIn = true; // ye method better isliye h coz session ek encrypted value as a cookie store krta h in browser of client which is checked only by server using a sercet value mentioned by us and usko user smjh nhi skta so vo usko edit kr dega if in case to it is gonna be verified at our server
  //   res.setHeader("Set-Cookie", "loggedIn=true"); // one way to set cokkie but isko user browser mei edit kr skta h
  // req.user work kr rha h cz in app.js vo haar incoming req pr middleware run krega then call next() toh fir uska registred route controller call hoga so re.user haar baar set ho jaega for every incoming request
  //   req.isLoggedIn = true; // this won't work coz ek baar response send kra user ko then nayi req ke liye ye isloggedin in stick nhi rhega uss nayi req par basically aise re object pr set krkr nhi rhega so we have to use cookies to store user is lofgged in or not
  // toh agar mai req.isLoggedIn = true; vo req.user waale middleare mei app.js mei daal du aur ye isAuthenticated: req.isLoggedIn, haar get request mei daal du then ye work krega approach but ye koi better approach nhi so we use cookies
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = async (req, res, next) => {
  try {
    // remove session from database
    await req.session.destroy();
    // remove the session cookie from browser
    await res.clearCookie("connect.sid");
 
    res.redirect("/login");
  } catch (err) {
    console.log("Error posting logout:", err);
  }
};
