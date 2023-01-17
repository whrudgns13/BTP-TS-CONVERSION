/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { SubscriptionDetails } from './subscription-details';
    import type { CloneSubscriptionDetails } from './clone-subscription-details';
    /**
     * Representation of the 'Subscriptions' schema.
     */
    export type Subscriptions = {
      /**
       * Only relevant for reuse instances. Total number of following instances of your broker service instance. The service only returns this array if the service instance uses the broker plan.
       * @example "1"
       */
      'cloneCount'?: number;
      /**
       * An array of subscriptions to your multitenant application for this tenant. The service only returns this array if you set the listSubscriptions query paramter to true.
       */
      'subscriptions'?: SubscriptionDetails[];
      /**
       * The number of subscriptions to your multitenant application for this tenant.
       * @example "1"
       */
      'subscriptionCountForTenant'?: number;
      /**
       * Only relevant for reuse instances. An array of following instances of your broker service instance. The service only returns this array if you set the listCloneSubscriptions query paramter to true and the service instance uses the broker plan.
       */
      'cloneSubscriptions'?: CloneSubscriptionDetails[];
      /**
       * Total number of refrences to the broker service instance.
       * @example "1"
       */
      'referenceCount'?: number;
      /**
       * Only relevant for reuse instances. Total number of subscriptions to following service instances.
       * @example "1"
       */
      'cloneSubscriptionCount'?: number;
      /**
       * Total number of subscriptions to your multitenant application.
       * @example "1"
       */
      'subscriptionCount'?: number;
    } | Record<string, any>;
