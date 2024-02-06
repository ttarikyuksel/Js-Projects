const currencyFirst = document.getElementById('currencyFirst');
const currencySecond = document.getElementById('currencySecond');
const count = document.getElementById('count');
const equal = document.getElementById('equal');
const exchangeRate = document.getElementById('exchangeRate');

updateRate();

function updateRate(){
    fetch(`https://v6.exchangerate-api.com/v6/462baea15556a442c1815844/latest/${currencyFirst.value}`).then((res)=>res.json()).then((data)=>{
        console.log(data);
        const rate = data.conversion_rates[currencySecond.value];
        exchangeRate.textContent = `1 ${currencyFirst.value} = ${rate} ${currencySecond.value}`

        equal.textContent = (count.value * rate).toFixed(2);
    });
}

currencyFirst.addEventListener('change',updateRate);
currencySecond.addEventListener('change',updateRate);
count.addEventListener('input',updateRate);


<apex:page standardController="RC_Request__c" extensions="PotentialCustomerandManagerTransfer">
		    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
            <script type="text/javascript">
              $(document).ready(function(){
               $("[id$=Potential]").prop("disabled",{!CheckBox1});
               $("[id$=Manager]").prop("disabled",{!CheckBox2});
               if({!RC_Request__c.PotentialCustomerMoved__c} == true){
               $("[id$=potentiallabel]").css("color", "Tomato");}
			   if({!RC_Request__c.Manager_Transfer__c} == true){
               $("[id$=managerlabel]").css("color", "Tomato");}                
            });
            </script>          
            <div>
                <style>                       
                    .custom-line {
                            border-top: 1px solid #000; 
                            margin-top: 20px;
                        }
                    .radioOption {
                        display: block;
                        margin-bottom: 10px;
                    }
                    td, th {
                             border: 1px solid #dddddd;
                             text-align: left;
                             padding: 4px;
                            }
                            
                    tr:nth-child(even) {
                             background-color: #dddddd;
                            }
                    table {
                          font-family: arial, sans-serif;
                          border-collapse: collapse;
                          width: 100%;
                        }                    
                </style>
                <apex:stylesheet value="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
                <apex:stylesheet value="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />                                                                                                                
                 <script>      
                    function GetData() {
                        var myradios = document.getElementsByName('SelectedRadio');
                                for(i = 0; i < myradios.length; i++) 
                                    if(myradios[i].checked) {
                                        if (myradios[i].value === "Potential") {
                                                document.getElementById('PotentialModal').style.display = 'block';
                                                document.getElementById('Home').style.display = 'none';		
                                        }
                                        else{
                                            document.getElementById('ManagerModal').style.display = 'block';
                                            document.getElementById('Home').style.display = 'none';	
                                        }
                                    }               	
                            }
                
                    function Back() {
                                document.getElementById('PotentialModal').style.display = 'none';
                                document.getElementById('Home').style.display = 'block';	
                            }
                    
					function Move() {                        
         						var inputField = document.getElementById('{!$Component.myForm.lookupField}_lkid');
         						var inputFieldName = document.getElementById('{!$Component.myForm.lookupField}');
                        		
                   		        var personToTransferValue = inputField.value;
                   		        var personToTransferValueName = inputFieldName.value;
                                               	
                                var userConfirmation = confirm("There are "+ownedAccounts.length+" Potential Customer records owned by the user named {!RC_Request__c.Person_Leaving_Work__r.Full_Name__c}, are you sure you want to move the related records to the user named "+personToTransferValueName+" ?");
									if (userConfirmation) {
                                        if(personToTransferValue.length == 15){
                                             moveToController(personToTransferValue);                                             
                                        }
                                        else{
	                                        alert("The value in the Person To Transfer field in Component is incorrect.\nIncorrect Value : " + personToTransferValueName );                                        		    
                                        	}
                                    }
                                    else {
                                        alert("Transfer Cancelled");
                                    }      
                        
                            	}
                    function showMessage() {
                        	if({!RC_Request__c.PotentialCustomerMoved__c} == true){alert("Potential Customer Transfer has been made. Check the files area.")};
                        }
                 </script>				                 
                  <div id='PotentialModal' class="modal" tabindex="-1" style="display:none; ;  position: relative;">
                  <apex:outputPanel id="renderTarget2">
                          <script>
                            if ('{!returnValue}' == 'Eror') {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                                alert('Please check the error.');                                
                            }
                      		if('{!returnValue}' == 'Successful'){
                                location.reload(true);
                                alert('Transfer Successfully Achieved');                              
                            }
					      </script>

                  </apex:outputPanel>


                    <apex:pageMessages id="renderTarget1"></apex:pageMessages>
                      &nbsp;
                    <p>
                        The table below shows some of the potential customer records of <b style="color:Tomato;">{!RC_Request__c.Person_Leaving_Work__r.Full_Name__c}</b>, the user who left the business.
                    </p>
                         <table border="1">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Customer Code</th>                        
                                </tr>
                            </thead>
                            <tbody>                        
                                <script>
                                    var ownedAccountsJson = '{!OwnedAccountsJson}';                                	                        
                                    if (ownedAccountsJson && ownedAccountsJson.trim() !== '') {
                                        var ownedAccounts = JSON.parse(ownedAccountsJson);
                                        
                                        for (var i = 0; i < 5 && i < ownedAccounts.length; i++) {
                                            document.write('<tr><td>' + ownedAccounts[i].Id + '</td>'
                                                            + '<td>' + ownedAccounts[i].Name + '</td>'
                                                            + '<td>' + ownedAccounts[i].CustomerCode__c + '</td></tr>');
                                        }
                                    } else {
                                        document.write('<tr><td colspan="3">No data available</td></tr>');
                                    }  
                                </script>
                            </tbody>
                        </table>
                      		&nbsp;
                            <p>
                        		Select the new owner of the Potential Customer records to be transferred.
                    		</p>
							<apex:form id="myForm">
								<div style="font-size: 12px;"><b>Person To Transfer</b></div>                                
                            	<apex:inputField value="{!RC_Request__c.Person_To_Transfer1__c}" id="lookupField"/>  
                                <button style="font-size: 16px;" type="button" onclick="Move();">Move</button>                                                                
                                <button style="font-size: 16px;" type="button" onclick="Back();">Back</button>                                
                                <apex:actionFunction name="moveToController" action="{!moveValueToController}" rerender="renderTarget1,renderTarget2" >								
                                <apex:param name="param1" assignTo="{!param1}" value="" />
                                </apex:actionFunction>                                                                                                      
                            </apex:form>                  		 
                   </div>  
                 
               	  <script>
                		function Back1() {
                                    document.getElementById('ManagerModal').style.display = 'none';
                                    document.getElementById('Home').style.display = 'block';	
                                }
                		function Move1() {                        
         						var inputField = document.getElementById('{!$Component.managerpage.lookupField}_lkid');
         						var inputFieldName = document.getElementById('{!$Component.managerpage.lookupField}');
                        		
                   		        var personToTransferValueManager = inputField.value;
                   		        var personToTransferValueNameManager = inputFieldName.value;
                            
                            	var relatedManager = {!relatedManagerJson};
                            	var relatedManager2 = {!relatedManager2Json};
                            	var relatedManager3 = {!relatedManager3Json};
                                console.log(relatedManager2);
                            	
                                var m1 = relatedManager.length;
                            	var m2 = relatedManager2.length;
                            	var m3 = relatedManager3.length;
                            
                                var total = m1+ m2 + m3;
                                
                                var userConfirmations = confirm("{!RC_Request__c.Person_Leaving_Work__r.Full_Name__c} is currently the administrator of "+total+" users. Are you sure "+personToTransferValueNameManager+" will be the new administrator of these users ?");
									if (userConfirmations) {
                                        if(personToTransferValueManager.length == 15){
                                             moveToManager(personToTransferValueManager);                                             
                                        }
                                        else{
	                                        alert("The value in the Person To Transfer field in Component is incorrect.\nIncorrect Value : " + personToTransferValueNameManager );                                        		    
                                        	}
                                    }
                                    else {
                                        alert("Transfer Cancelled");
                                    }      
                        
                            	}
                		function showMessage1() {
                        	if({!RC_Request__c.Manager_Transfer__c} == true){alert("Manager Transfer has been made. Check the files area.")};
                        }
                  </script>
                  <div id='ManagerModal' class="modal" tabindex="-1" style="display:none; ;  position: relative;">
					<apex:outputPanel id="renderTarget22">
                          <script>
                            if ('{!returnValueManager}' == 'Eror') {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                                alert('Please check the error.');                                
                            }
                      		if('{!returnValueManager}' == 'Successful'){
                                location.reload(true);
                                alert('Transfer Successfully Achieved');                              
                            }
					      </script>

                    </apex:outputPanel>


                    <apex:pageMessages id="renderTarget11"></apex:pageMessages>                      
                      &nbsp;
                     <p>
                        The table below shows some of the users of which the departed user <b style="color:Tomato;">{!RC_Request__c.Person_Leaving_Work__r.Full_Name__c}</b> was an manager.
                     </p>
                     <p style="font-size: 1.5em;">
                       <b>Users that he is the Manager of</b> 
                     </p> 
                    <p>
                    </p>
                    <p>
                    </p>
                    <p>
                    </p>                    
                    	<table border="1">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>                        
                                <script>
                   					var relatedManager = '{!relatedManagerJson}';                                
                                    if (relatedManager.length >2) {
                                        var relatedManagers = JSON.parse(relatedManager);
                                        
                                        for (var i = 0; i < 5 && i < relatedManagers.length; i++) {
                                            document.write('<tr><td>' + relatedManagers[i].Id + '</td>'
                                                            + '<td>' + relatedManagers[i].Full_Name__c + '</td></tr>');
                                        }
                                    } else {
                                        document.write('<tr><td colspan="3"><b>No data available</b></td></tr>');
                                    }  
                                </script>
                            </tbody>
                        </table>
                    &nbsp; 
                    <p style="font-size: 1.5em;">
                       <b>Users that he is the 2nd Manager of</b> 
                     </p> 
                    <p>
                    </p>
                    <p>
                    </p>
                    <p>
                    </p>                    
                    	<table border="1">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>                        
                                <script>
                   					var relatedManager2 = '{!relatedManager2Json}';
                                    if (relatedManager2.length >2) {
                                        var relatedManagers2 = JSON.parse(relatedManager2);
                                        
                                        for (var i = 0; i < 5 && i < relatedManagers2.length; i++) {
                                            document.write('<tr><td>' + relatedManagers2[i].Id + '</td>'
                                                            + '<td>' + relatedManagers2[i].Full_Name__c + '</td></tr>' );
                                        }
                                    } else {
                                        document.write('<tr><td colspan="3"><b>No data available</b></td></tr>');
                                    }  
                                </script>
                            </tbody>
                        </table>
                         &nbsp; 
                    <p style="font-size: 1.5em;">
                       <b>Users that he is the 3nd Manager of</b> 
                    </p> 
                    <p>
                    </p>
                    <p>
                    </p>
                    <p>
                    </p>                 
                    	<table border="1">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>                        
                                <script>
                   					var relatedManager3 = '{!relatedManager3Json}';                                
                                    if (relatedManager3.length > 2) {
                                        var relatedManagers3 = JSON.parse(relatedManager3);
                                        
                                        for (var i = 0; i < 5 && i < relatedManagers3.length; i++) {
                                            document.write('<tr><td>' + relatedManagers3[i].Id + '</td>'
                                                            + '<td>' + relatedManagers3[i].Full_Name__c + '</td></tr>');
                                        }
                                    } else {
                                        document.write('<tr><td colspan="3"><b>No data available</b></td></tr>');
                                    }  
                                </script>
                            </tbody>
                        </table>
                         &nbsp;                     
                    	 <apex:form id="managerpage">
								<div  style="font-size: 12px;"><b>New Manager</b></div>                                
                            	<apex:inputField value="{!RC_Request__c.New_Manager__c}" id="lookupField"/>  
                                <button style="font-size: 16px;" type="button" onclick="Move1();">Move</button>                                                                
                                <button style="font-size: 16px;" type="button" onclick="Back1();">Back</button>                                
                                <apex:actionFunction name="moveToManager" action="{!moveValueToManager}" rerender="renderTarget11,renderTarget22" >								
                                <apex:param name="param2" assignTo="{!param2}" value="" />
                                </apex:actionFunction>                                                                                                      
                     	 </apex:form>         
                </div>
        
                <div id="Home" style="display:block;">
                     <apex:sectionHeader title="" subtitle="Transfer Provider" />
                    <div style="font-size: 16px; padding: 10px 20px;">
                        <form id="myForm">
                            <div class="radioOption" >                               
								<input onmouseover="showMessage()" type="radio" id="Potential" name="SelectedRadio" value="Potential" />
                                <label id="potentiallabel" for="Potential">Potential Customer Transfer</label>                                
                            </div>
                            <div class="radioOption" >
                                <p class="helpText">Test</p>          
                                
                                <input onmouseover="showMessage1()" type="radio" id="Manager" name="SelectedRadio" value="Manager"/>                                
                                <label id="managerlabel" for="Manager">Manager Transfer</label>
                            </div>
                        </form>
                    </div>
                    <div style="position: absolute; bottom: 20px; right: 20px;">
                        <button type="button" onclick="GetData();" style="font-size: 16px; padding: 10px 20px;">Next</button>
                    </div>
                </div>
            </div>
	<apex:includeScript value="https://code.jquery.com/jquery-3.2.1.slim.min.js" />
    <apex:includeScript value="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
    <apex:includeScript value="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" />
    <apex:includeScript value="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
</apex:page>