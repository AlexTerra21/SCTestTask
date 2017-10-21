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
					<td><button title="Edit"><img src="Images/edit.png" width="20px"/>Edit</button></td>
					<td><button title="Remove"><img src="Images/delete.png" width="20px"/>Remove</button></td>
                </tr>
    }
}

class EmployeesList extends React.Component{
    
       constructor(props){
           super(props);
           this.state = { employees: [], count: 0};
    
        //    this.onAddPhone = this.onAddPhone.bind(this);
            this.onRemovePhone = this.onRemovePhone.bind(this);
       }
       // загрузка данных
      /*  loadData() {
           var xhr = new XMLHttpRequest();
           xhr.open("get", this.props.getUrl, true);
           xhr.onload = function () {
               var data = JSON.parse(xhr.responseText);
               this.setState({ employees: data });
           }.bind(this);
           xhr.send();
        
       } */

       ajaxLoadData() {
            $.ajax({
                url:  this.props.getUrl,
                dataType: 'json',
                success: function (data) {
                    this.setState({ employees: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.getUrl, status, err.toString());
                }.bind(this)
            });
       }

       ajaxGetCount() {
        $.ajax({
            url:  this.props.countUrl,
            dataType: 'json',
            success: function (data) {
                this.setState({ count: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.countUrl, status, err.toString());
            }.bind(this)
        });
        //    var xhr1 = new XMLHttpRequest();
        //    xhr1.open("get", this.props.getCount, true);
        //    xhr1.onload = function () {
        //        var data = JSON.parse(xhr1.responseText);
        //        this.setState({ count: data });
        //    }.bind(this);
        //    xhr1.send();
       }

       componentDidMount() {
           this.ajaxLoadData();
           this.ajaxGetCount();
           //this.loadData();
           //this.getCount();
       }

       // удаление объекта
       onRemovePhone(employee) {
       }
       render(){
           var remove = this.onRemovePhone;
           return <div>
                   <h2>Employees list</h2>
                   <button title="Add"><img src="Images/add.png" width="20px"/>Add</button>
                   <div>
                    <table>
                        <thead>
                        <tr>
                            <td>
                                <center>
                                    <b>Name</b>
                                    <button title="Sort Up">▲</button>
                                    <button title="Sort Down">▼</button>
                                </center>
							</td>
                            <td>
                                <center>
                                    <b>Birthday</b>
                                    <button title="Sort Up">▲</button>
                                    <button title="Sort Down">▼</button>
                                </center>
                            </td>
                            <td>
                                <center>
                                    <b>Email</b>
                                    <button title="Sort Up">▲</button>
                                    <button title="Sort Down">▼</button>
                                </center>
                            </td>
                            <td>
                                <center>
                                    <b>Salary</b>
                                    <button title="Sort Up">▲</button>
                                    <button title="Sort Down">▼</button>
                                </center>
                            </td>
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
                    <p>Количество сотрудников {this.state.count}</p>
                   </div>
           </div>;
       }
   }


ReactDOM.render(
    <EmployeesList getUrl="/home/getemployees" postUrl="/home/addemploee" deleteUrl="/home/deleteemployee" countUrl="/home/getcountelement" />,
    document.getElementById("content")
  );

