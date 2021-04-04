import { ResourceDictionary } from "./Resources";

export const CzechResourcesDictionary: ResourceDictionary = {
  Routes: {
    Login: "prihlaseni",
    Users: "uzivatele",
    UserDetail: "detail",
    Products: "produkty",
    LogOut: "odhlaseni",
    Orders: "objednavky"
  },
  Errors: {
    ApplicationError: {
      Title: "Chyba",
      Subtitle:
        "V aplikaci nastala chyba. Opakujte akci později.",
      Home: "Domů",
    },
    Error404: {
      Subtitle: "Stránka nenalezena",
      Home: "Domů",
    },
  },
  Login: {
    FormTitle: "Přihlášení",
    Login: {
      Label: "Login",
    },
    Password: {
      Label: "Heslo",
    },
    Submit: "Přihlásit",
    Error: {
      General: "Při přihlášení nastala chyba",
      InvalidLogin: "Login nebyl nalezen",
    },
  },
  Dashboard: {
    Title: "Dashboard",
    Logout: "Odhlásit",
  },
  Users: {
    Title: "Uživatelé",
  },
  Validation: {
    Required: "Pole je povinné",
    InvalidEmail: "Email není validní",
  },
  MenuItems: {
    Login: "Přihlášení",
    Users: "Uživatelé",
    Products: "Produkty",
    ManageProducts: "Správa produktů",
    LogOut: "Odhlásit se",
    UserOrders: "Moje objednávky",
    AdminOrders: "Všechny objednávky"
  },
  Products: {
    Title: "Produkty"
  },
  Orders: {
    UserTitle: "Moje objednávky",
    AdminTitle: "Všechny objednávky"
  }
};
