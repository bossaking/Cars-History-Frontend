export class Globals {
  public static required: string = "Pole jest wymagane";
  public static invalidEmail: string = "Niepoprawny format adresu e-mail";
  public static passwordLengthError: string = "Hasło musi zawierać co najmniej 6 znaków";
  public static passwordsMismatchError: string = "Hasła się nie zgadzają";

  public static takenEmailError: string = "Użytkownik o podanym adresie email już istnieje";
  public static takenFieldError: string = "Rekord o podanej nazwie już istnieje";

  public static wrongPassword: string = "Niepoprawne hasło";
  public static wrongEmail:string = "Użytkownik o podanym adresie email nie istnieje";
  public static inactiveUser:string = "Konto nie zostało jeszcze aktywowane";

  public static apiUrl: string = "http://localhost:8000/api/";
}
