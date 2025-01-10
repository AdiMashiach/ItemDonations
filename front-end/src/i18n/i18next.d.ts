import { i18n, TOptions } from "i18next";
import React from "react";
import "react-i18next";
import type * as translations from ".";
import { useTranslation } from "react-i18next";
import { defaultNS, resources } from "./i18n";

declare module "react-i18next" {
  type DefaultResources = typeof translations;
  type Namespace = keyof typeof translations;
  type Keys<N extends Namespace> = keyof (typeof translations)[N];
}

interface TFunction<
  TResult = React.ReactNode,
  TKeys = string,
  TInterpolationMap extends object = StringMap
> {
  <T = TResult>(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string
  ): T;
  <T = TResult>(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string
  ): T;
}

type UseTranslationResult<N, T> = {
  t: TFunction<T, TKeys<N>>;
  i18n: i18n;
  ready: boolean;
};

export function useTranslation<T = string>(
  ns?: Namespace,
  options?: UseTranslationOption
): UseTranslationResult<Namespace, T>;

interface CustomTypeOptions {
  defaultNS: typeof defaultNS;
  resources: (typeof resources)["he"];
}
