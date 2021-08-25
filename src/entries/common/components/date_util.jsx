export function getYear() {
    var fecha = new Date()
    return fecha.getFullYear()
}
export function getNewDateTimeFormat() {
    //2020-10-02 22:56:00
    var fecha = new Date()
    return fecha.getFullYear() + "-" + (fecha.getMonth() < 9 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" + (fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()) + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
}

export function getDateFormat() {
    //2020-10-02
    var fecha = new Date()
    return fecha.getFullYear() + "-" + (fecha.getMonth() < 9 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" + (fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate());
}

export function getDate(datetime) {
    if(datetime == null){
        return null
    }
    var datetime_array = datetime.split('T')
    var date_array = datetime_array[0].split('-')
    return date_array[2].concat('/').concat(date_array[1]).concat('/').concat(date_array[0])
}

export function getDateFormat_SeparadoPorGuion(datetime) {
    if(datetime == null){
        return null
    }
    // return 2020-10-02
    var datetime_array = datetime.split('T')
    var date_array = datetime_array[0].split('-')
    return date_array[0].concat('-').concat(date_array[1]).concat('-').concat(date_array[2])
}

export function getAge(birth_date) {
    if(birth_date == null){
        return "Sin información."
    }
    var datetime_array = birth_date.split('T')
    var date_array = datetime_array[0].split('-')
    return calculate_age(date_array[1], date_array[2], date_array[0]) + " años";
}

export function calculate_age(birth_month,birth_day,birth_year) {
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age = today_year - birth_year;

    if ( today_month < (birth_month - 1)) {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
        age--;
    }
    return age;
}

export function getDateTimeWithoutTimeZone(string_datetime_with_timezone){
    if(string_datetime_with_timezone != null){
        let date_ob = new Date(string_datetime_with_timezone)
        let date = ("0" + date_ob.getDate()).slice(-2)
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
        let year = date_ob.getFullYear()
        let hours = ("0" + (date_ob.getHours())).slice(-2)
        let minutes = ("0" + (date_ob.getMinutes())).slice(-2)
        let seconds = ("0" + (date_ob.getSeconds())).slice(-2)
        return (date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " Hrs")
    }
    return ""
}

export function isDatetimeFinishedExam(datetime_finished_exam){
    // "1900-01-01T00:00:00+00:00"
    if(datetime_finished_exam != null){
        let date_ob = new Date(datetime_finished_exam)
        if(date_ob.getFullYear() <= 1901){
            return true
        }
        return false
    }
    return true
}