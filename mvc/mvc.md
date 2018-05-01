MVC is a design pattern that should be used to structure your application. MVC stands for Model, View, Control. It basically sais that you should separate your business-logic (Model) from your User Interface (View) and your Control-Logic.

For example:

You have a user class, that loads users from the database, can save em. This is your model.

You have a Controller that uses the User class to log a user in.

After the controller is done, it displays a Template containing the Text "Welcome $username".

Relationship:


1. the View knows nothing about the Model apart from it implements some interface
2. the Model knows nothing of the View and the Controller
3. the Controller knows about both the Model and the View and tells the View to go do something with the data from the Model.

![mvc roles](https://svbtleusercontent.com/2ogkmbb1r5luwq_small.png)
![mvc data flow](https://svbtleusercontent.com/q6omneoniko5hw_small.png)

Better Example:

	var M = {}, V = {}, C = {};

	/* Model View Controller Pattern with Form Example */


	/* Controller Handles the Events */

	M = {
	    data: {
	        userName : "Dummy Guy",
	        userNumber : "000000000"
	    }, 
	    setData : function(d){
	        this.data.userName = d.userName;
	        this.data.userNumber = d.userNumber;
	    },
	    getData : function(){
	        return data;
	    }
	}

	V = {
	    userName : document.querySelector("#inputUserName"),
	    userNumber : document.querySelector("#inputUserNumber"),
	    update: function(M){
	        this.userName.value = M.data.userName;
	        this.userNumber.value = M.data.userNumber;
	    }
	}

	C = {
	    model: M,
	    view: V,
	    handler: function(){
	        this.view.update(this.model);
	    }
	}

	document.querySelector(".submitBtn").addEventListener("click", function(){
	    C.handler.call(C);
	}); 

Purpose
So why is MVC so prevalent? Some main advantages are:

Separates presentation logic from application logic. Presentation relates to the UI, such as what <div>s, <form> controls or ajax spinners are shown at any point in time. Application or business logic includes data modeling, integrity, calculations, and so forth. This division is important as UIs are often device dependent and change more rapidly than application logic, preventing the need to retest models.
Decouples event-based inputs from display outputs. While the views and controllers often have a close coupling, breaking I/O into two areas leads to more reusable parts where a given view can be directed by a selected controller based on the desired interaction. Controllers could change their method of interaction dynamically at runtime depending on the state of the model[4].
Reuses data modeling across multiple views. M-to-1 view-to-model ratios allows a) the same data to be displayed in different ways such as a pie chart and bar chart pulling the same data, and b) multiple views of the same data shown at the same time. If the user changes data in one view, the change is propagated to the other views.
Controls interactions between modules where data changes can propagate from model to model and presentation changes from controller to controller, avoiding reliance on global state.
Can facilitate parallel development of UI and application based components on larger projects with multiple developers[2].

