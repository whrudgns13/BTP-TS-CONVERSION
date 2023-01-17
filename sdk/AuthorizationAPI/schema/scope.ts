/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'Scope' schema.
     */
    export type Scope = {
      'custom-grant-as-authority-to-apps'?: string[];
      'custom-granted-apps'?: string[];
      /**
       * @example "Display values"
       */
      'description'?: string;
      'grant-as-authority-to-apps'?: string[];
      'granted-apps'?: string[];
      /**
       * The name of the application and scope as defined in the application security descriptor xs-security.json. The name has a maximum length of 193 characters, including the fully qualified application name. The fully qualified scope name starts with the application ID followed by an optional number of components and finally the scope, each separated by a period (.). For example: service-manager!b105.entitlement.notify. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9), hyphen (-), underscore (_), forward slash (/), backslash (\), and colon (:).
       * @example "product-list!a314.User"
       */
      'name'?: string;
    } | Record<string, any>;
