class Employee extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {data: props.employee};
        this.onClick = this.onClick.bind(this);
    }
    onClick(e){
        this.props.onRemove(this.state.data);
    }
    render(){
		var pattern = /Date\(([^)]+)\)/;
		
		var results = pattern.exec(this.state.data.Birthday);

		 

		console.log(results);
		var date = new Date(parseFloat(results[1]));
		console.log(date);

        return <tr>
					<td>{this.state.data.Name}</td>
					<td><center>{date.toLocaleDateString()}</center></td>
					<td>{this.state.data.Email}</td>
					<td>{this.state.data.Salary}</td>
					<td><button title="Edit"><img src="Images/edit.png" width="20px"/></button></td>
					<td><button title="Remove"><img src="Images/delete.png" width="20px"/></button></td>
                </tr>
    }
}

class PhonesList extends React.Component{
    
       constructor(props){
           super(props);
           this.state = { employees: [] };
    
        //    this.onAddPhone = this.onAddPhone.bind(this);
            this.onRemovePhone = this.onRemovePhone.bind(this);
       }
       // загрузка данных
       loadData() {
           var xhr = new XMLHttpRequest();
           xhr.open("get", this.props.getUrl, true);
           xhr.onload = function () {
               var data = JSON.parse(xhr.responseText);
               this.setState({ employees: data });
           }.bind(this);
           xhr.send();
       }

       componentDidMount() {
           this.loadData();
       }

       // удаление объекта
       onRemovePhone(employee) {
       }
       render(){
           var remove = this.onRemovePhone;
           return <div>
                   <h2>Employees list</h2>
                   <button title="Add"><img src="Images/add.png" width="20px"/></button>
                   <div>
                    <table>
                        <thead>
                        <tr>
                            <td><center><b>Name</b></center></td>
                            <td><center><b>Birthday</b></center></td>
                            <td><center><b>Email</b></center></td>
                            <td><center><b>Salary</b></center></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(function(employee){
                                    return <Employee key={employee.Id} employee={employee} onRemove={remove} />
                                })
                            }
					    </tbody>
                    </table>
                   </div>
           </div>;
       }
   }


ReactDOM.render(
    <PhonesList getUrl="/home/getemployees" postUrl="/home/addemploee" deleteUrl="/home/deleteemployee" />,
    document.getElementById("content")
  );

