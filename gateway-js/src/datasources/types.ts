import {
  GatewayGraphQLResponse,
  GatewayGraphQLRequestContext,
} from '../typings/serverGatewayInterface';

export interface GraphQLDataSource<
  TContext extends Record<string, any> = Record<string, any>,
> {
  process(
    options: GraphQLDataSourceProcessOptions<TContext>,
  ): Promise<GatewayGraphQLResponse>;
}

export enum GraphQLDataSourceRequestKind {
  INCOMING_OPERATION = 'incoming operation',
  HEALTH_CHECK = 'health check',
  LOADING_SCHEMA = 'loading schema',
}

export type GraphQLDataSourceProcessOptions<
  TContext extends Record<string, any> = Record<string, any>,
> = {
  /**
   * The request to send to the subgraph.
   */
  request: GatewayGraphQLRequestContext<TContext>['request'];
} & (
  | {
      kind: GraphQLDataSourceRequestKind.INCOMING_OPERATION;
      /**
       * The GraphQLRequestContext for the operation received by the gateway, or
       * one of the strings if this operation is generated by the gateway without an
       * incoming request.
       */
      incomingRequestContext: GatewayGraphQLRequestContext<TContext>;
      /**
       * Equivalent to incomingRequestContext.context (provided here for
       * backwards compatibility): the object created by the Apollo Server
       * `context` function.
       *
       * @deprecated Use `incomingRequestContext.context` instead (after
       * checking `kind`).
       */
      context: GatewayGraphQLRequestContext<TContext>['context'];
    }
  | {
      kind:
        | GraphQLDataSourceRequestKind.HEALTH_CHECK
        | GraphQLDataSourceRequestKind.LOADING_SCHEMA;
      /**
       * Mostly provided for historical reasons.
       */
      context: {};
    }
);
