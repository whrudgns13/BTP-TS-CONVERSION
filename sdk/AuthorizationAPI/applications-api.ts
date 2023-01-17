/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { App, Scope, Subscriptions } from './schema';
/**
 * Representation of the 'ApplicationsApi'.
 * This API is part of the 'AuthorizationAPI' service.
 */
export const ApplicationsApi = {
  /**
   * Returns all service instances of the current subaccount, which are registered at the Authorization and Trust Management service with OAuth 2.0 clients. The system provides information about the XSUAA application and its OAuth client.
   * @param queryParameters - Object containing the following keys: onlyForOrgId, onlyWithClientId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getApps: (queryParameters?: {'onlyForOrgId'?: string,
  'onlyWithClientId'?: boolean}) => new OpenApiRequestBuilder<App[]>(
    'get',
    '/sap/rest/authorization/v2/apps',
    {
          queryParameters
        }
  ),
  /**
   * Returns a list of authorities that have been granted to an application protected by the service instance of the Authorization and Trust Management service. Identify a granting application by the grantedByAppGuid or grantedByAppId parameter. If you don't specify a granting application, the list is empty.
   * @param appId - The application ID of the application to check for granted authorities. This ID identifies the application receiving the authorities from another application.
   * @param queryParameters - Object containing the following keys: grantedByAppGuid, grantedByAppId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getGrantedAuthorities: (appId: string, queryParameters?: {'grantedByAppGuid'?: string,
  'grantedByAppId'?: string}) => new OpenApiRequestBuilder<string[]>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/authorities',
    {
          pathParameters: { appId },
          queryParameters
        }
  ),
  /**
   * Returns all scopes of an application protected by a service instance of the Authorization and Trust Management service. ID.
   * @param appId - The application ID of the application to check for scopes. The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  listScopes: (appId: string) => new OpenApiRequestBuilder<Scope[]>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/scopes',
    {
          pathParameters: { appId }
        }
  ),
  /**
   * Returns information about a specific scope of a specific application.
   * @param appId - The application ID of the application to check for scopes. The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
   * @param scopeName - Name of the scope.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getScope: (appId: string, scopeName: string) => new OpenApiRequestBuilder<Scope>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/scopes/{scopeName}',
    {
          pathParameters: { appId, scopeName }
        }
  ),
  /**
   * Returns information about an XSUAA application instance specified by the app ID or service instance ID. The XSUAA application instance paired with the information about its OAuth client defines a service instance of the Authorization and Trust Management service.
   * @param id - The ID of the application or service instance. To use service instance ID, set the isServiceInstanceId parameter to true.
   * @param queryParameters - Object containing the following keys: hideDetails, isServiceInstanceId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getAppById: (id: string, queryParameters?: {'hideDetails'?: boolean,
  'isServiceInstanceId'?: boolean}) => new OpenApiRequestBuilder<App>(
    'get',
    '/sap/rest/authorization/v2/apps/{id}',
    {
          pathParameters: { id },
          queryParameters
        }
  ),
  /**
   * Returns information about the service instance, which is associated with the client credentials you submitted with this REST call.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getOwnApp: () => new OpenApiRequestBuilder<App>(
    'get',
    '/sap/rest/authorization/v2/ownapp'
  ),
  /**
   * Returns the number of subscribers for the service instance, which is associated with the OAuth token you submitted with this REST call. Include the tenant or zone ID of your subaccount as a URL parameter.
   * @param queryParameters - Object containing the following keys: tenant, listSubscriptions, listCloneSubscriptions.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getAppByToken: (queryParameters: {'tenant': string,
  'listSubscriptions'?: string,
  'listCloneSubscriptions'?: string}) => new OpenApiRequestBuilder<Subscriptions>(
    'get',
    '/sap/rest/authorization/v2/ownapp/usage',
    {
          queryParameters
        }
  ),
  /**
   * Returns information about all role collections containing a specific role. The role is identified by application ID, the name of the role template, and role name.
   * @param appId - The ID of the application of the role.
   * @param roleName - The name of the role.
   * @param roleTemplateName - The name of the role template.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleCollectionsByAppIdTemplateNameAndRoleName: (appId: string, roleName: string, roleTemplateName: string) => new OpenApiRequestBuilder<any>(
    'get',
    '/sap/rest/authorization/v2/rolecollections/roles/{appId}/{roleTemplateName}/{roleName}',
    {
          pathParameters: { appId, roleName, roleTemplateName }
        }
  )
};
