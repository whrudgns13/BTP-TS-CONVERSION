/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'TokenPolicySettingsResp' schema.
     */
    export type TokenPolicySettingsResp = {
      /**
       * Time in seconds between when a access token is issued and when it expires. The value ranges from 300 seconds to 99,999,999 seconds, in other words, from 5 minutes to more than 3 years. Keep token validity as short as possible, but not less than 30 minutes. The default value is 43,200 seconds. The value `-1` means that the token uses the default setting.
       * Format: "int32".
       */
      'accessTokenValidity'?: number;
      /**
       * If true, the service only issues one refresh token per client_id and user_id combination.
       */
      'refreshTokenUnique'?: boolean;
      /**
       * Time in seconds between when a refresh token is issued and when it expires. The value ranges from 600 seconds to 99,999,999 seconds, in other words, from 10 minutes to more than 3 years. The validity of refresh tokens must be longer than the validity for access tokens. The system never issues refresh tokens if the validity is shorter. The default value is 24,192,000 seconds. The value `-1` means that the token uses the default setting.
       * Format: "int32".
       */
      'refreshTokenValidity'?: number;
      /**
       * The ID of the key to use for signing metadata and assertions.
       * @example "default-jwt-key--9988843812"
       */
      'activeKeyId'?: string;
      'keyIds'?: string[];
    } | Record<string, any>;
