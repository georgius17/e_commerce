import { ObjPathProxy, createProxy, getPath } from "ts-object-path";
import i18next, { ResourceLanguage } from "i18next";
import { useTranslation } from "react-i18next";

export interface ResourceDictionary extends ResourceLanguage {
  Routes: {
    Login: string;
    Users: string;
    UserDetail: string;
    Products: string;
    LogOut: string;
    Orders: string;
  };
  Errors: {
    ApplicationError: {
      Title: string;
      Subtitle: string;
      Home: string;
    };
    Error404: {
      Subtitle: string;
      Home: string;
    };
  };
  Login: {
    FormTitle: string;
    Login: {
      Label: string;
    };
    Password: {
      Label: string;
    };
    Submit: string;
    Error: {
      General: string;
      InvalidLogin: string;
    };
  };
  Dashboard: {
    Title: string;
    Logout: string;
  };
  Validation: {
    Required: string;
    InvalidEmail: string;
  };
  MenuItems: {
    Login: string;
    Users: string;
    Products: string;
    ManageProducts: string;
    LogOut: string;
    UserOrders: string;
    AdminOrders: string;
  };
  Users: {
    Title: string;
  };
  Products: {
    Title: string;
  };
  Orders: {
    UserTitle: string;
    AdminTitle: string;
  }
}

export const Resources = createProxy<ResourceDictionary>();

type ProxyProperty = Readonly<{
  path: string;
}>;

export function getResourcePath<TRoot, T>(
  proxy: ObjPathProxy<ResourceDictionary, string>,
): string {
  const path = getPath(proxy);

  if (!path || path.length === 0) return "";
  if (path.length === 1) return path[0].toString();
  return `${path[0].toString()}:${path.slice(1).join(".")}`;
}

export function useResource() {
  const { t: i18Translation } = useTranslation();

  return {
    t: (resourcePath: ObjPathProxy<ResourceDictionary, string>) =>
      i18Translation(getResourcePath(resourcePath)),
  };
}

export function useServerError<TRoot, T>(
  parentObject: ObjPathProxy<ResourceDictionary, object>,
  fallbackProperty: ObjPathProxy<ResourceDictionary, string>,
) {
  const { t } = useResource();
  return {
    translateError: (code: string | null | undefined) => {
      if (!code) {
        return null;
      }

      const newCode = `${getResourcePath(parentObject as any)}.${code}`;

      const resource = i18next.exists(newCode)
        ? i18next.t(newCode)
        : t(fallbackProperty);

      return resource;
    },
  };
}
