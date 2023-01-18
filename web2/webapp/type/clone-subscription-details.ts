/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'CloneSubscriptionDetails' schema.
     */
    export type CloneSubscriptionDetails = {
      /**
       * Only relevant for reuse instances. The identifier for the following service instance.
       */
      'id'?: string;
      /**
       * The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number. The following and broker instances are identified by the clone- and broker- prefixes.
       * @example "clone-product-list!a314|broker-product-list!a314"
       */
      'appid'?: string;
      /**
       * Tenant ID of your subaccount. The zoneId parameter is the same ID and can be used interchangably with tenant ID.
       * @example "11a0bbba-6e3e-4460-8cf8-702803a9b12b"
       */
      'tenantId'?: string;
    } | Record<string, any>;
