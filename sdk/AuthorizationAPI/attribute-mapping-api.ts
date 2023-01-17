/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RoleCollectionAttribute, App, IdentityProviderMapping } from './schema';
/**
 * Representation of the 'AttributeMappingApi'.
 * This API is part of the 'AuthorizationAPI' service.
 */
export const AttributeMappingApi = {
  /**
   * Returns role collections and their attributes specified by the identity provider (origin).
   * @param origin - The origin key is the unique name of the identity provider (IdP).
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getIdpAttributeValues: (origin: string) => new OpenApiRequestBuilder<RoleCollectionAttribute[]>(
    'get',
    '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/rolecollections',
    {
          pathParameters: { origin }
        }
  ),
  /**
   * Returns the attributes for a specific role collection specified by the identity provider (origin) and the role collection name.
   * @param origin - The origin key is the unique name of the identity provider (IdP).
   * @param roleCollectionName - The Name of the role collection.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getIdpAttributeValuesFromRoleCollection: (origin: string, roleCollectionName: string) => new OpenApiRequestBuilder<RoleCollectionAttribute[]>(
    'get',
    '/sap/rest/authorization/v2/identity-providers/{origin}/rolecollections/{roleCollectionName}',
    {
          pathParameters: { origin, roleCollectionName }
        }
  ),
  /**
   * Returns all role collections of a specific identity provider that have a specific attribute name and value.
   * @param origin - The origin key is the unique name of the identity provider (IdP).
   * @param attributeName - attribute name
   * @param attributeValue - IDP attribute value
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleCollectionByAttributeValue: (origin: string, attributeName: string, attributeValue: string) => new OpenApiRequestBuilder<App[]>(
    'get',
    '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/{attributeName}/{attributeValue}',
    {
          pathParameters: { origin, attributeName, attributeValue }
        }
  ),
  /**
   * Returns a role collection that contains a specific attribute, specified by the role collection name and attribute name.
   * @param attributeName - The name of the attribute.
   * @param origin - The origin key is the unique name of the identity provider (IdP).
   * @param roleCollectionName - The Name of the role collection.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getIdpAttributeValuesFromRoleCollectionByAttribute: (attributeName: string, origin: string, roleCollectionName: string) => new OpenApiRequestBuilder<App[]>(
    'get',
    '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/{attributeName}/rolecollections/{roleCollectionName}',
    {
          pathParameters: { attributeName, origin, roleCollectionName }
        }
  ),
  /**
   * Add an attribute with a value to an identity provider and application role collection.
   * @param origin - The origin key is the unique name of the identity provider (IdP).
   * @param body - The JSON contains the attribute name, value, and comparison operator.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addIdpAttributeToRoleCollection: (origin: string, body: IdentityProviderMapping) => new OpenApiRequestBuilder<any>(
    'post',
    '/sap/rest/authorization/v2/identity-providers/{origin}/attributes',
    {
          pathParameters: { origin },
          body
        }
  ),
  /**
   * Deletes an attribute mapping from a role collection specified by the attribute name, value, the operator, and the role collection name.
   * @param attributeName - Name of the identity provider attribute.
   * @param attributeValue - Value of the identity provider attribute.
   * @param operator - Matching operator between the attribute name and attribute value.
   * @param origin - The origin key is the unique name of the identity provider (IdP).
   * @param roleCollectionName - Name of the role collection
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteIdpAttributeToRoleCollection: (attributeName: string, attributeValue: string, operator: string, origin: string, roleCollectionName: string) => new OpenApiRequestBuilder<App[]>(
    'delete',
    '/sap/rest/authorization/v2/identity-providers/{origin}/attributes/{attributeName}/{operator}/{attributeValue}/rolecollections/{roleCollectionName}',
    {
          pathParameters: { attributeName, attributeValue, operator, origin, roleCollectionName }
        }
  )
};
