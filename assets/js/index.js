console.log('Running')
var createcount = 0;

$('.create').on('click', (e) => {
    createcount++;
    if (createcount == 1) {
        $('.create').fadeOut('3000')
        $('.join').fadeOut('3000')
        $('.submit-create').fadeIn('slow')
        $('#create-room-form').fadeIn('slow')
        $('#create-room-form').css({
            'margin': '15px',
            'padding': '5px',
            'width': '95%',
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': ' 5px',
            'border': '0px'
        })
        $('.roomid').fadeIn('slow')
        createcount++;
    }
    else {
        e.preventDefault();
        console.log($('#usrname').val())
        if ($('#usrname').val()) {
            console.log("submit now only")
            if ($('#usrname').val().length > 10) {
                console.log('length exceeded')
                alert("User Name should not Exceed 10 letters")
            }
            else {
                $('#abcd').submit();
            }
        }
        else{
            alert("Enter User Name")
        }
    }
})

console.log(roomId);
$('.roomid').on('click', () => {
    navigator.clipboard.writeText(roomId);
    alert("Room Id Copied to Clipboard")
})

$('.join').on('click', (e) => {
    createcount++;
    if (createcount == 1) {
        $('.create').fadeOut('3000')
        $('.join').fadeOut('3000')
        $('.submit-join').fadeIn('slow')
        $('#join-room-form').css({
            'margin': '15px',
            'padding': '5px',
            'width': '95%',
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': ' 5px',
            'border': '0px'
        })
        $('.roomid').fadeIn('slow')
        createcount++;
    }
    else {
        e.preventDefault();
        const x = $('#roomid').val();
        if(x.length!=36){
            alert('Invalid Room Id');
        }
        else{
        window.location.href='/'+x}
    }
})