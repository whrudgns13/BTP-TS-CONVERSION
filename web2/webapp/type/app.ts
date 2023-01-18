/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { AppAttribute } from './app-attribute';
    import type { OAuth2Configuration } from './o-auth-2-configuration';
    import type { RoleTemplate } from './role-template';
    import type { Scope } from './scope';
    /**
     * Representation of the 'App' schema.
     */
    export type App = {
      /**
       * The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
       * @example "product-list!a314"
       */
      'appid'?: string;
      'attributes'?: AppAttribute[];
      'authorities'?: string[];
      /**
       * @example "This is an example application."
       */
      'description'?: string;
      'foreign-scope-references'?: string[];
      'masterAppId'?: string;
      'oauth2-configuration'?: OAuth2Configuration;
      /**
       * @example "2294832d-1776-418a-835e-ec1b7b46a12e"
       */
      'orgId'?: string;
      /**
       * @example "HWEgt9/jJGFjzT8j+/x9pGivrAuKbUMUK8PgWEx3cLY="
       */
      'planId'?: string;
      /**
       * @example "application"
       */
      'planName'?: string;
      'role-templates'?: RoleTemplate[];
      'scopes'?: Scope[];
      /**
       * @example "38abaeac-27a4-4ead-8548-1928a03913bc"
       */
      'serviceinstanceid'?: string;
      'spaceId'?: string;
      /**
       * @example "dedicated"
       */
      'tenant-mode'?: string;
      'userName'?: string;
      /**
       * The name of the application as defined in the application security descriptor xs-security.json. The name has a maximum length of 128 characters. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9), hyphen (-), underscore (_), forward slash (/), and backslash (\).
       * @example "product-list"
       */
      'xsappname'?: string;
    } | Record<string, any>;
