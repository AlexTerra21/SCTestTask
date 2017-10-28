// Компонент формы редактирования сотрудника
class EditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: this.getId(),       // Id сотрудника
                       name: '',               // Имя  
                       birthday: '1990-01-01', // День рождения 
                       email: '',              // Адрер электронной почты 
                       salary: 0               // Зарплата
                     }
    }
    
    // Пролучаем список GET параметров страницы и возвращаем id сотрудника
    getId () {
        var getArray = {}; 
        var getString = window.location.search.substring(1).split("&"); 
        for(var i=0; i < getString.length; i++) { 
            var getVar = getString[i].split("="); 
            getArray[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
        } 
        return getArray['id']  
    }

    // Отправка Id и получение в ответ данных записи
	LoadEmployee ()  {
        var data_id = { 'id': this.state.id };
            $.ajax({
                url:  this.props.employeeUrl,
                type: 'POST',
                dataType: 'json',
                data: data_id,
                success: function (data) {
                    this.setState({name: data.Name});
                    // Дату необходимо преобразовать из формата JSON в формат yyyy-MM-dd для поля ввода даты
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
    // Инициализация компонента
    componentDidMount() {
        if ( this.state.id > 0)
            this.LoadEmployee();
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
    // Валидация формы
    validateForm () {
        // Очистка строк для вывода сообщений валидации
        document.getElementById('nameMessage').innerHTML = '';
        document.getElementById('birthdayMessage').innerHTML = '';
        document.getElementById('emailMessage').innerHTML = '';
        document.getElementById('salaryMessage').innerHTML = '';
        var valid = true;
        if (this.state.name.trim() == '') { // Проверка наличия ввода имени
            document.getElementById('nameMessage').innerHTML = 'Enter name.';
            valid = false;
        }  
        // Проверка корректности ввода даты
        var dateStrSrc = this.state.birthday;
        var date = new Date(dateStrSrc);
        var dateStrDest = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        if(dateStrSrc != dateStrDest) {
            document.getElementById('birthdayMessage').innerHTML = 'Incorrect date.';
            valid = false;           
        }
        // Проверка корректности ввода email
        var adr_pattern = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
        if (!adr_pattern.test(this.state.email)) {
            document.getElementById('emailMessage').innerHTML = 'Incorrect email.';
            valid = false;
        } 
        if (this.state.email.trim() == '') { // Проверка наличия ввода email
            document.getElementById('emailMessage').innerHTML = 'Enter email.';
            valid = false;
        }  
        if (this.state.salary < 0) {
            document.getElementById('salaryMessage').innerHTML = 'The salary should be greater than zero.';
            valid = false;
        }
        return valid;
    }

    // Cохранение данных фромы
    onSave () {
        if (!this.validateForm()) return; // Если валидация не прошла - выход 
        var data = { 'Id' : this.state.id,
                     'Name': this.state.name, 
                     'Birthday': this.state.birthday, 
                     'Email': this.state.email, 
                     'Salary': this.state.salary
                    };
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
            <label>Birthday </label><input type="date"  min="1900-01-01" max="2100-01-01" value={this.state.birthday} onChange={this.onBirthdayChange.bind(this)}/>
                                    <div id="birthdayMessage" style={{color:'red'}}></div><br/>
            <label>Email    </label><input type="email"  value={this.state.email}    onChange={this.onEmailChange.bind(this)}/>
                                    <div id="emailMessage" style={{color:'red'}}></div><br/>
            <label>Salary   </label><input type="number" max="10000000" value={this.state.salary}   onChange={this.onSalaryChange.bind(this)}/>
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