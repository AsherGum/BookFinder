// Authentication state observer.
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		console.log("User is logged in");

		// Get User information.
		var docRef = database.collection("Users").doc(user.uid);
		docRef.get().then(function (doc) {
			// Makes sure document exists.
			if (doc.exists) {
				// Reads the data required.
				console.log("Document data:", doc.data());
				document.getElementById("first").value = doc.data().FirstName;
				document.getElementById("last").value = doc.data().LastName;
				document.getElementById("username").value = doc.data().UserName;
				document.getElementById("email").value = doc.data().Email;
				document.getElementById("university").value = doc.data().University;
				document.getElementById("phone").value = doc.data().PhoneNumber;
			} else {
				// doc.data() will be undefined in this case.
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});

	} else {
		// User is signed out.
		console.log("user is logged out");
		// Go to login Page.
		window.location.href = "./login.html";

	}
});

// Submit Button clicked.
$("#submit").closest("form").on("submit", function (event) {
	event.preventDefault();

	// Getting all the values.
	var first = document.getElementById("first").value;
	var last = document.getElementById("last").value;
	var username = document.getElementById("username").value;
	var university = document.getElementById("university").value;
	var phone = document.getElementById("phone").value;

	var user = firebase.auth().currentUser;

	// Add user Profile to database.
	database.collection("Users").doc(user.uid).update({
			FirstName: first,
			LastName: last,
			PhoneNumber: phone,
			University: university,
			UserName: username

			//Show profile updated
		}).then(function () {
			alert("Profile Updated!");
			console.log("Profile successfully updated!");
		})

		.catch(function (error) {
			// The document probably doesn't exist.
			alert("Error updating Profile");
			console.error("Error updating Profile", error);
		});
})