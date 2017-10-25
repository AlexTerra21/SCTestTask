
class EditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: this.getId(), name: '', birthday: '1990-01-01', email: '', salary: 0 }

    }
    
    // Пролучаем список GET параметров страницы и возвращаем id сотрудника
    getId () {
        var getArray = {}; 
        var getString = window.location.search.substring(1).split("&"); 
        //console.log(getString);
        for(var i=0; i < getString.length; i++) { 
            var getVar = getString[i].split("="); 
            getArray[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
        } 
        //console.log(getArray);
        return getArray['id']
    }

    // Отправка Id и получение в ответ данных записи
	ajaxLoadEmployee ()  {
        var data_id = { 'id': this.state.id };
            $.ajax({
                url:  this.props.employeeUrl,
                type: 'POST',
                dataType: 'json',
                data: data_id,
                success: function (data) {
                    this.setState({name: data.Name});
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(data.Birthday);
                    var date = new Date(parseFloat(results[1]));
                    var strDate = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) +
                                                       '-' + ('0' + date.getDate()).slice(-2);
                    this.setState({birthday: strDate});
                    this.setState({email: data.Email});
                    this.setState({salary: data.Salary});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.employeeUrl, status, err.toString());
                }.bind(this)
            });
    }

    componentDidMount() {
        if ( this.state.id > 0)
            this.ajaxLoadEmployee();
    } 

    onNameChange (event) {
        this.setState({name: event.target.value});
    }

    onBirthdayChange (event) {
        this.setState({birthday: event.target.value});
    }

    onEmailChange (event) {
        this.setState({email: event.target.value});
    }
     
    onSalaryChange (event) {
        this.setState({salary: event.target.value});
    }
    // Отмена ввода формы
    onCancel () {
        document.location.href = "/home";
    }

    validateForm () {
        var valid = true;
        if (this.state.name.trim() == '') { // name
            document.getElementById('nameMessage').innerHTML = 'Enter name.';
            valid = false;
        }  
        // birthbay
        var dateStrSrc = this.state.birthday;
        var date = new Date(dateStrSrc);
        var dateStrDest = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        if(dateStrSrc != dateStrDest) {
            document.getElementById('birthdayMessage').innerHTML = 'Incorrect date.';
            valid = false;           
        }
        var adr_pattern = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
        if (!adr_pattern.test(this.state.email)) {
            document.getElementById('emailMessage').innerHTML = 'Incorrect email.';
            valid = false;
        } 
        if (this.state.email.trim() == '') { // email
            document.getElementById('emailMessage').innerHTML = 'Enter email.';
            valid = false;
        }  
        if (this.state.salary < 0) {
            document.getElementById('salaryMessage').innerHTML = 'The salary should be greater than zero.';
            valid = false;
        }
        return valid;
    }


    // сохранение данных фромы
    onSave () {
        if (!this.validateForm()) return; // Если валидация не прошла - выход 
        var data = { 'Id' : this.state.id,
                     'Name': this.state.name, 
                     'Birthday': this.state.birthday, 
                     'Email': this.state.email, 
                     'Salary': this.state.salary
                    };
        console.log('Data =', data);
        $.ajax({
            url:  this.props.saveUrl,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                document.location.href = "/home";
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.employeeUrl, status, err.toString());
            }.bind(this)
        });
    }

    render () {
        return <div>
            <h2>Elployee data</h2>
            <label>Name     </label><input type="text"   value={this.state.name}     onChange={this.onNameChange.bind(this)}/>
                                    <div id="nameMessage" style={{color:'red'}}></div><br/>
            <label>Birthday </label><input type="date"   value={this.state.birthday} onChange={this.onBirthdayChange.bind(this)}/>
                                    <div id="birthdayMessage" style={{color:'red'}}></div><br/>
            <label>Email    </label><input type="email"  value={this.state.email}    onChange={this.onEmailChange.bind(this)}/>
                                    <div id="emailMessage" style={{color:'red'}}></div><br/>
            <label>Salary   </label><input type="number" value={this.state.salary}   onChange={this.onSalaryChange.bind(this)}/>
                                    <div id="salaryMessage" style={{color:'red'}}></div><br/>
            <input type="submit" value='Save' onClick={this.onSave.bind(this)}/> 
            <input type="reset" value='Cancel' onClick={this.onCancel.bind(this)}/> 
        </div>
    }
}

ReactDOM.render(
    <EditForm employeeUrl="/home/getemployee" saveUrl="/home/addreplaceemployee" />,
    document.getElementById("content")
  );