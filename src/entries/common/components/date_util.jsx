export function getDate(datetime) {
    var datetime_array = datetime.split('T')
    var date_array = datetime_array[0].split('-')
    return date_array[1].concat('/').concat(date_array[2]).concat('/').concat(date_array[0])
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