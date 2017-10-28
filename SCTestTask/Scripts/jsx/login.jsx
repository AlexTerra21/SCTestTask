// Компонент формы авторизации
class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { login: '',   
                       password: ''
                     };
    }
    // Метод для модификации поля Login
    onLoginChange (event) {
        this.setState({login: event.target.value});
    }
    // Метод для модификации поля Password
    onPasswordChange (event) {
        this.setState({password: event.target.value});
    }
    // Нажата кнопка Login
    onLogin () {
        var data = { 'Name': this.state.login, 
                     'Password': this.state.password };
        $.ajax({
            url:  this.props.loginUrl,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.result) { // Проверка результатов аутентификации
                    document.location.href = "/home"; // Проверка прошла - переход на главную страницу
                } else { // Проверка не прошла - вывод сообщения
                    document.getElementById('message').style = {color:'red'};
                    document.getElementById('message').innerHTML = data.message;
                }
            }.bind(this),
            beforeSend: function () { // Вывод сообщения ожидания окончания проверки
                document.getElementById('message').style = {color:'black'};
                document.getElementById('message').innerHTML = 'Processing...';
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.loginUrl, status, err.toString());
            }.bind(this)
        });
    }

    render () {
        return <div>
            <h2>Enter your login and password</h2>
            <label>Login</label><input type="text" value={this.state.login} onChange={this.onLoginChange.bind(this)}/><br/>
            <label>Password</label><input type="password" value={this.state.password} onChange={this.onPasswordChange.bind(this)}/><br/>
            <div id="message"></div>
            <input type="submit" value='Login' onClick={this.onLogin.bind(this)}/> 
        </div>
    }
}

ReactDOM.render(
    <LoginForm loginUrl="/account/login"/>,
    document.getElementById("content")
);