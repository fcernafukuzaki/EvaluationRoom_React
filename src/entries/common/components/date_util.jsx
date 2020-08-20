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
    var datetime_array = birth_date.split('T')
    var date_array = datetime_array[0].split('-')
    return calculate_age(date_array[1], date_array[2], date_array[0])
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