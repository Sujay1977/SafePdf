var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { ViteReactSSG } from "vite-react-ssg";
import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Heart, Github, X, Menu, Shield, EyeOff, Lock, ServerOff, Cpu, Zap, Ban, Monitor, Download, Trash2, FileUp, Loader2, ArrowRight, Check, CheckCircle, FileText, Unlock as Unlock$1, RotateCcw, RotateCw, GripVertical, Images, Type, MousePointer2, Edit3, Square, Eraser, Highlighter, Undo, Redo, Bold, Italic, ArrowLeft } from "lucide-react";
import { DodoPayments } from "dodopayments-checkout";
import { useDropzone } from "react-dropzone";
import { __extends, __spreadArrays, __assign, __awaiter, __generator, __rest } from "tslib";
import { FontNames, Encodings, Font } from "@pdf-lib/standard-fonts";
import pako$1 from "pako";
import UPNG from "@pdf-lib/upng";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Paragraph, TextRun, Packer } from "docx";
import require$$0 from "lie";
import "setimmediate";
import require$$0$1 from "readable-stream";
import { Reorder } from "framer-motion";
import clsx from "clsx";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
function App() {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location2 = useLocation();
  const [userAuth, setUserAuth] = useState(false);
  useEffect(() => {
    const publicKey = "pk_snd_091bba0fefcd4852a44cccdcf47602b5";
    {
      DodoPayments.Initialize({
        publicKey,
        mode: "live"
      });
    }
  }, []);
  const handleSupportMe = (e) => {
    e.preventDefault();
    const publicKey = "pk_snd_091bba0fefcd4852a44cccdcf47602b5";
    const productId = "pdt_0NWNP0K7PftXJmjaCc5fF";
    try {
      DodoPayments.Initialize({
        publicKey,
        mode: "live"
      });
      DodoPayments.Checkout.open({
        productId,
        quantity: 1
      });
    } catch (error2) {
      console.error("Dodo Payments checkout error:", error2);
      window.open(`https://checkout.dodopayments.com/buy/${productId}`, "_blank");
    }
  };
  const handleGetStarted = () => {
    const element = document.getElementById("all-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isActive = (path) => {
    if (path === "/") return location2.pathname === "/";
    return location2.pathname.startsWith(path);
  };
  const navLinks = [
    { name: "Merge PDF", path: "/merge" },
    { name: "Split PDF", path: "/split" },
    { name: "Compress PDF", path: "/compress" },
    { name: "Convert PDF", path: "/pdf-to-word" },
    { name: "All Tools", path: "/" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1350px] mx-auto px-4 md:px-8 h-18 flex items-center justify-between py-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100 dark:border-blue-900/30", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl", children: "picture_as_pdf" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold font-display text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "SafePDF" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.path,
          className: `
                                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                                ${isActive(link.path) ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"}
                            `,
          children: link.name
        },
        link.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSupportMe,
            className: "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFBF00] hover:bg-[#F2B600] text-black text-sm font-bold shadow-[0_2px_10px_rgba(255,191,0,0.2)] hover:shadow-[0_4px_15px_rgba(255,191,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Heart, { size: 16, className: "fill-black/10 stroke-[2.5px]" }),
              /* @__PURE__ */ jsx("span", { children: "Support Me" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/Sujay1977/SafePdf",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hidden sm:flex items-center justify-center p-2 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300",
            "aria-label": "View Source on GitHub",
            children: /* @__PURE__ */ jsx(Github, { size: 22, strokeWidth: 2 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleGetStarted,
            className: "hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95",
            children: userAuth ? "Dashboard" : "Get Started"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg",
            onClick: () => setIsMenuOpen(!isMenuOpen),
            children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
          }
        )
      ] })
    ] }),
    isMenuOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col p-6 gap-3 animate-in slide-in-from-top-4 duration-300 z-40", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.path,
          onClick: () => setIsMenuOpen(false),
          className: `
                                    flex items-center p-4 rounded-xl text-base font-medium transition-colors
                                    ${isActive(link.path) ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}
                                `,
          children: link.name
        },
        link.name
      )) }),
      /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-100 dark:bg-slate-800 my-2" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSupportMe,
            className: "flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFBF00] text-black text-sm font-bold shadow-md hover:bg-[#F2B600] transition-all",
            children: [
              /* @__PURE__ */ jsx(Heart, { size: 18, className: "fill-black/10 stroke-[2.5px]" }),
              "Support Me"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://github.com/Sujay1977/SafePdf",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all",
            children: [
              /* @__PURE__ */ jsx(Github, { size: 18 }),
              "GitHub"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              handleGetStarted();
              setIsMenuOpen(false);
            },
            className: "flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-md",
            children: userAuth ? "Dashboard" : "Get Started"
          }
        )
      ] })
    ] })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "w-full bg-gray-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 mt-auto", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto px-4 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-slate-900 dark:text-white", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-3xl", children: "picture_as_pdf" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "SafePDF" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[280px]", children: "Professional-grade PDF tools processed entirely in your browser for maximum privacy. No server uploads, ever." }),
      /* @__PURE__ */ jsxs("div", { className: "text-slate-500 dark:text-slate-500 text-xs mt-auto", children: [
        "© 2026 SafePDF • Made by ",
        /* @__PURE__ */ jsx("a", { href: "https://x.com/sujay__raj", target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors", children: "Sujay" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-base", children: "Product" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/#tools", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "All Tools" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Workflows" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Pricing (Free)" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Updates" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-base", children: "Popular Tools" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/merge", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Merge PDF" }),
        /* @__PURE__ */ jsx(Link, { to: "/split", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Split PDF" }),
        /* @__PURE__ */ jsx(Link, { to: "/compress", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Compress PDF" }),
        /* @__PURE__ */ jsx(Link, { to: "/pdf-to-word", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "PDF to Word" }),
        /* @__PURE__ */ jsx(Link, { to: "/protect", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Protect PDF" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-base", children: "Trust & Security" }),
      /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "100% Client-Side Processing" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "No Data Collection" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "GDPR Compliant Privacy" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800 w-fit mt-2", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base", children: "check_circle" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wide", children: "Processed Locally" })
      ] })
    ] })
  ] }) }) });
};
const Layout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex flex-col w-full", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const SEO = ({ title, description, type = "website", name = "SafePDF", children }) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: name }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    children
  ] });
};
const PrivacySection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full py-24 px-4 md:px-10 overflow-hidden bg-slate-50 dark:bg-[#0B1120]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6", children: [
          /* @__PURE__ */ jsx(Shield, { size: 14, className: "animate-pulse" }),
          /* @__PURE__ */ jsx("span", { children: "Client-Side Architecture" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight", children: [
          "Your documents are ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400", children: "none of our business." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg", children: "We've re-engineered the standard PDF editor. By removing the server from the equation, we guarantee your data never leaves your device." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          {
            icon: EyeOff,
            title: "No Tracking",
            desc: "Zero analytics or data collection scripts."
          },
          {
            icon: Lock,
            title: "Local Processing",
            desc: "All code runs directly in your browser."
          },
          {
            icon: ServerOff,
            title: "0% Server Data",
            desc: "We literally cannot see your files."
          },
          {
            icon: Cpu,
            title: "Native Speed",
            desc: "Powered by WebAssembly for raw performance."
          }
        ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "group p-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(item.icon, { size: 20, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-slate-100 mb-1", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 leading-snug", children: item.desc })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 w-full max-w-lg flex justify-center lg:justify-end", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-square max-h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center overflow-hidden group", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full p-6 flex items-center justify-between border-b border-white/5 bg-white/5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500/80" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500/80" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500/80" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-slate-400", children: "SECURE_TUNNEL_ACTIVE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 my-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 border border-dashed border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-8 border border-white/5 rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-32 h-32 flex items-center justify-center bg-blue-500/10 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-sm", children: [
              /* @__PURE__ */ jsx(Shield, { size: 64, className: "text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-pulse" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full mt-8 space-y-2 font-mono text-xs md:text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-400", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-50", children: ">" }),
              /* @__PURE__ */ jsx("span", { children: "Initiating local environment..." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-400 delay-100", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-50", children: ">" }),
              /* @__PURE__ */ jsx("span", { children: "Blocking external requests..." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-400 delay-200", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-50", children: ">" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Status: ",
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold blink", children: "100% Client-Side" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" })
        ] })
      ] })
    ] }) })
  ] });
};
const WhySafePdf = () => {
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-slate-50 dark:bg-[#0B1120] py-24 px-4 md:px-10 overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 text-center items-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight", children: [
          "The Desktop Experience, ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400", children: "inside your Browser." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl", children: "Powerful PDF tools that run entirely on your device. No uploads, no waiting, no compromise." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30", children: /* @__PURE__ */ jsx(Shield, { size: 28, strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight", children: "Privacy by Default" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md font-medium", children: "No 'Incognito' mode needed; your files never touch the cloud." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-[100px] -mr-8 -mb-8 group-hover:scale-110 transition-transform duration-500 ease-out" }),
          /* @__PURE__ */ jsx(Lock, { className: "absolute right-10 top-10 text-slate-200 dark:text-slate-700/30 w-32 h-32 -rotate-12 group-hover:rotate-0 transition-all duration-500", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30", children: /* @__PURE__ */ jsx(Zap, { size: 28, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight", children: "Native Performance" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium", children: "Processes large PDFs in milliseconds using your local CPU/GPU." }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx("div", { className: "h-1 w-12 bg-purple-500/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-purple-500 animate-[loading_1s_ease-in-out_infinite] origin-left" }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-rose-500/20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-rose-500/30", children: /* @__PURE__ */ jsx(Ban, { size: 28, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight", children: "Zero Friction" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium", children: "No accounts, no cookies, no subscriptions. Just open and work." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-600/30 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-4", children: [
                /* @__PURE__ */ jsx(Monitor, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: "PWA Ready" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black mb-2 tracking-tight", children: "Works Offline" }),
              /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-lg leading-relaxed font-medium", children: "Lost connection? No problem. SafePDF is a Progressive Web App (PWA) that works perfectly without internet." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300 border border-white/10", children: /* @__PURE__ */ jsx(Download, { size: 32, className: "text-white", strokeWidth: 1.5 }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl" })
        ] })
      ] })
    ] })
  ] });
};
const ToolHeaderFilters = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    "All",
    "Organize PDF",
    "Optimize PDF",
    "Convert PDF",
    "PDF Security"
  ];
  return /* @__PURE__ */ jsx("section", { className: "pt-8 pb-4 w-full px-4 md:px-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto flex flex-col items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex gap-3 overflow-x-auto pb-4 px-4 w-full md:w-auto scrollbar-hide -mx-4 md:mx-0 snap-x", children: categories.map((category) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onCategoryChange(category),
      className: `
                                    whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 snap-center
                                    ${activeCategory === category ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"}
                                `,
      children: category
    },
    category
  )) }) }) }) });
};
const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into a single unified document in the order you want.",
    icon: "call_merge",
    link: "/merge",
    category: "Organize PDF"
  },
  {
    title: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: "call_split",
    link: "/split",
    category: "Organize PDF"
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: "compress",
    link: "/compress",
    category: "Optimize PDF"
  },
  {
    title: "PDF to Word",
    description: "Convert your PDF files to editable Word documents (DOC, DOCX).",
    icon: "article",
    link: "/pdf-to-word",
    category: "Convert PDF"
  },
  {
    title: "Protect PDF",
    description: "Encrypt your PDF file with a password to ensure security.",
    icon: "lock",
    link: "/protect",
    category: "PDF Security"
  },
  {
    title: "Unlock PDF",
    description: "Remove password security from PDFs, making them free to use.",
    icon: "lock_open",
    link: "/unlock",
    category: "PDF Security"
  },
  {
    title: "Rotate PDF",
    description: "Rotate your PDF pages. You can select specific pages to rotate.",
    icon: "rotate_right",
    link: "/rotate",
    category: "Organize PDF"
  },
  {
    title: "Organize PDF",
    description: "Sort, add, and delete PDF pages. Drag and drop to reorder.",
    icon: "sort",
    link: "/organize",
    category: "Organize PDF"
  },
  {
    title: "PDF to JPG",
    description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: "image",
    link: "/pdf-to-jpg",
    category: "Convert PDF"
  },
  {
    title: "JPG to PDF",
    description: "Convert your images (JPG, PNG, BMP, GIF, TIFF) to PDF files.",
    icon: "picture_as_pdf",
    link: "/jpg-to-pdf",
    category: "Convert PDF"
  },
  {
    title: "Sign PDF",
    description: "Sign your PDF yourself or request electronic signatures from others.",
    icon: "draw",
    link: "/sign",
    category: "PDF Security"
  },
  {
    title: "Edit PDF",
    description: "Add text, shapes, comments and highlights to your PDF file.",
    icon: "edit_document",
    link: "/edit",
    category: "Organize PDF"
  }
];
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const toolsRef = useRef(null);
  const scrollToTools = () => {
    const element = document.getElementById("all-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchedTool = tools.find(
        (tool) => tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query)
      );
      if (matchedTool) {
        navigate(matchedTool.link);
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ jsxs(
      SEO,
      {
        title: "SafePDF | Secure, Private PDF Processing & Tools",
        description: "Secure, Private PDF Processing. SafePDF offers free, client-side tools to merge, split, compress, and edit PDFs directly in your browser without uploading files.",
        children: [
          /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://safepdf.site/" }),
          /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web-based",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": "Merge PDF, Split PDF, Compress PDF, Edit PDF, Client-side Security"
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-full relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/50", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-[1350px] mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center lg:items-start text-center lg:text-left gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase", children: "100% Client-Side Privacy" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]", children: [
              "Your PDFs,",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400", children: "Your Privacy." })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0", children: "Free, secure, and client-side PDF tools. Your files are processed in your browser and never uploaded to any server." })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: scrollToTools,
              className: "group flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300 min-w-[200px]",
              children: [
                "Get Started",
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform", children: "arrow_forward" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-[3px] border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-8 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-16 border border-blue-500/30 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center z-10 border border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-white", children: "lock" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-sm text-white font-bold", children: "check" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-10 right-10 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce delay-700", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-green-500 rounded-full" }),
            "Encrypted"
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-10 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce delay-1000", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }),
            "Local"
          ] }) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-background-light dark:bg-background-dark -mt-6 z-20 relative", children: /* @__PURE__ */ jsx("div", { className: "max-w-[800px] mx-auto px-4 md:px-10", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center h-14 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "text-slate-400 dark:text-slate-500 pl-4 pr-2 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "search" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "flex w-full flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-lg font-medium focus:outline-0 focus:ring-0 px-2 h-full",
          placeholder: "Search for PDF tools (e.g. Merge, Split)...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          onKeyDown: handleSearch
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { ref: toolsRef, id: "all-tools", className: "w-full bg-background-light dark:bg-background-dark pt-4", children: [
      /* @__PURE__ */ jsx(
        ToolHeaderFilters,
        {
          activeCategory,
          onCategoryChange: setActiveCategory
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "layout-container flex grow flex-col w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6", children: filteredTools.map((tool) => /* @__PURE__ */ jsxs(Link, { to: tool.link, className: "group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-400/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/5 dark:bg-blue-500/10 text-primary group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-3xl", children: tool.icon }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-slate-900 dark:text-white text-lg font-bold group-hover:text-primary transition-colors", children: tool.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm leading-relaxed", children: tool.description })
          ] })
        ] }, tool.title)) }),
        filteredTools.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-lg", children: "No tools found matching your criteria." }) })
      ] }),
      /* @__PURE__ */ jsx(PrivacySection, {}),
      /* @__PURE__ */ jsx(WhySafePdf, {})
    ] })
  ] });
};
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = new Uint8Array(256);
for (var i$1 = 0; i$1 < chars.length; i$1++) {
  lookup[chars.charCodeAt(i$1)] = i$1;
}
var encodeToBase64 = function(bytes) {
  var base642 = "";
  var len = bytes.length;
  for (var i = 0; i < len; i += 3) {
    base642 += chars[bytes[i] >> 2];
    base642 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base642 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base642 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base642 = base642.substring(0, base642.length - 1) + "=";
  } else if (len % 3 === 1) {
    base642 = base642.substring(0, base642.length - 2) + "==";
  }
  return base642;
};
var decodeFromBase64 = function(base642) {
  var bufferLength = base642.length * 0.75;
  var len = base642.length;
  var i;
  var p = 0;
  var encoded1;
  var encoded2;
  var encoded3;
  var encoded4;
  if (base642[base642.length - 1] === "=") {
    bufferLength--;
    if (base642[base642.length - 2] === "=") {
      bufferLength--;
    }
  }
  var bytes = new Uint8Array(bufferLength);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base642.charCodeAt(i)];
    encoded2 = lookup[base642.charCodeAt(i + 1)];
    encoded3 = lookup[base642.charCodeAt(i + 2)];
    encoded4 = lookup[base642.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return bytes;
};
var DATA_URI_PREFIX_REGEX = /^(data)?:?([\w\/\+]+)?;?(charset=[\w-]+|base64)?.*,/i;
var decodeFromBase64DataUri = function(dataUri) {
  var trimmedUri = dataUri.trim();
  var prefix = trimmedUri.substring(0, 100);
  var res = prefix.match(DATA_URI_PREFIX_REGEX);
  if (!res)
    return decodeFromBase64(trimmedUri);
  var fullMatch = res[0];
  var data = trimmedUri.substring(fullMatch.length);
  return decodeFromBase64(data);
};
var toCharCode = function(character) {
  return character.charCodeAt(0);
};
var toCodePoint = function(character) {
  return character.codePointAt(0);
};
var toHexStringOfMinLength = function(num, minLength) {
  return padStart(num.toString(16), minLength, "0").toUpperCase();
};
var toHexString = function(num) {
  return toHexStringOfMinLength(num, 2);
};
var charFromCode = function(code) {
  return String.fromCharCode(code);
};
var charFromHexCode = function(hex) {
  return charFromCode(parseInt(hex, 16));
};
var padStart = function(value, length, padChar) {
  var padding = "";
  for (var idx = 0, len = length - value.length; idx < len; idx++) {
    padding += padChar;
  }
  return padding + value;
};
var copyStringIntoBuffer = function(str, buffer, offset) {
  var length = str.length;
  for (var idx = 0; idx < length; idx++) {
    buffer[offset++] = str.charCodeAt(idx);
  }
  return length;
};
var escapeRegExp = function(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var cleanText = function(text) {
  return text.replace(/\t|\u0085|\u2028|\u2029/g, "    ").replace(/[\b\v]/g, "");
};
var escapedNewlineChars = ["\\n", "\\f", "\\r", "\\u000B"];
var isNewlineChar = function(text) {
  return /^[\n\f\r\u000B]$/.test(text);
};
var lineSplit = function(text) {
  return text.split(/[\n\f\r\u000B]/);
};
var mergeLines = function(text) {
  return text.replace(/[\n\f\r\u000B]/g, " ");
};
var charAtIndex = function(text, index) {
  var cuFirst = text.charCodeAt(index);
  var cuSecond;
  var nextIndex = index + 1;
  var length = 1;
  if (
    // Check if it's the start of a surrogate pair.
    cuFirst >= 55296 && cuFirst <= 56319 && // high surrogate
    text.length > nextIndex
  ) {
    cuSecond = text.charCodeAt(nextIndex);
    if (cuSecond >= 56320 && cuSecond <= 57343)
      length = 2;
  }
  return [text.slice(index, index + length), length];
};
var charSplit = function(text) {
  var chars2 = [];
  for (var idx = 0, len = text.length; idx < len; ) {
    var _a2 = charAtIndex(text, idx), c = _a2[0], cLen = _a2[1];
    chars2.push(c);
    idx += cLen;
  }
  return chars2;
};
var buildWordBreakRegex = function(wordBreaks) {
  var newlineCharUnion = escapedNewlineChars.join("|");
  var escapedRules = ["$"];
  for (var idx = 0, len = wordBreaks.length; idx < len; idx++) {
    var wordBreak = wordBreaks[idx];
    if (isNewlineChar(wordBreak)) {
      throw new TypeError("`wordBreak` must not include " + newlineCharUnion);
    }
    escapedRules.push(wordBreak === "" ? "." : escapeRegExp(wordBreak));
  }
  var breakRules = escapedRules.join("|");
  return new RegExp("(" + newlineCharUnion + ")|((.*?)(" + breakRules + "))", "gm");
};
var breakTextIntoLines = function(text, wordBreaks, maxWidth, computeWidthOfText) {
  var regex = buildWordBreakRegex(wordBreaks);
  var words = cleanText(text).match(regex);
  var currLine = "";
  var currWidth = 0;
  var lines = [];
  var pushCurrLine = function() {
    if (currLine !== "")
      lines.push(currLine);
    currLine = "";
    currWidth = 0;
  };
  for (var idx = 0, len = words.length; idx < len; idx++) {
    var word = words[idx];
    if (isNewlineChar(word)) {
      pushCurrLine();
    } else {
      var width = computeWidthOfText(word);
      if (currWidth + width > maxWidth)
        pushCurrLine();
      currLine += word;
      currWidth += width;
    }
  }
  pushCurrLine();
  return lines;
};
var dateRegex = /^D:(\d\d\d\d)(\d\d)?(\d\d)?(\d\d)?(\d\d)?(\d\d)?([+\-Z])?(\d\d)?'?(\d\d)?'?$/;
var parseDate = function(dateStr) {
  var match = dateStr.match(dateRegex);
  if (!match)
    return void 0;
  var year = match[1], _a2 = match[2], month = _a2 === void 0 ? "01" : _a2, _b2 = match[3], day = _b2 === void 0 ? "01" : _b2, _c = match[4], hours = _c === void 0 ? "00" : _c, _d = match[5], mins = _d === void 0 ? "00" : _d, _e = match[6], secs = _e === void 0 ? "00" : _e, _f = match[7], offsetSign = _f === void 0 ? "Z" : _f, _g = match[8], offsetHours = _g === void 0 ? "00" : _g, _h = match[9], offsetMins = _h === void 0 ? "00" : _h;
  var tzOffset = offsetSign === "Z" ? "Z" : "" + offsetSign + offsetHours + ":" + offsetMins;
  var date = /* @__PURE__ */ new Date(year + "-" + month + "-" + day + "T" + hours + ":" + mins + ":" + secs + tzOffset);
  return date;
};
var findLastMatch = function(value, regex) {
  var _a2;
  var position = 0;
  var lastMatch;
  while (position < value.length) {
    var match = value.substring(position).match(regex);
    if (!match)
      return { match: lastMatch, pos: position };
    lastMatch = match;
    position += ((_a2 = match.index) !== null && _a2 !== void 0 ? _a2 : 0) + match[0].length;
  }
  return { match: lastMatch, pos: position };
};
var last = function(array) {
  return array[array.length - 1];
};
var typedArrayFor = function(value) {
  if (value instanceof Uint8Array)
    return value;
  var length = value.length;
  var typedArray = new Uint8Array(length);
  for (var idx = 0; idx < length; idx++) {
    typedArray[idx] = value.charCodeAt(idx);
  }
  return typedArray;
};
var mergeIntoTypedArray = function() {
  var arrays = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    arrays[_i] = arguments[_i];
  }
  var arrayCount = arrays.length;
  var typedArrays = [];
  for (var idx = 0; idx < arrayCount; idx++) {
    var element = arrays[idx];
    typedArrays[idx] = element instanceof Uint8Array ? element : typedArrayFor(element);
  }
  var totalSize = 0;
  for (var idx = 0; idx < arrayCount; idx++) {
    totalSize += arrays[idx].length;
  }
  var merged = new Uint8Array(totalSize);
  var offset = 0;
  for (var arrIdx = 0; arrIdx < arrayCount; arrIdx++) {
    var arr = typedArrays[arrIdx];
    for (var byteIdx = 0, arrLen = arr.length; byteIdx < arrLen; byteIdx++) {
      merged[offset++] = arr[byteIdx];
    }
  }
  return merged;
};
var mergeUint8Arrays = function(arrays) {
  var totalSize = 0;
  for (var idx = 0, len = arrays.length; idx < len; idx++) {
    totalSize += arrays[idx].length;
  }
  var mergedBuffer = new Uint8Array(totalSize);
  var offset = 0;
  for (var idx = 0, len = arrays.length; idx < len; idx++) {
    var array = arrays[idx];
    mergedBuffer.set(array, offset);
    offset += array.length;
  }
  return mergedBuffer;
};
var arrayAsString = function(array) {
  var str = "";
  for (var idx = 0, len = array.length; idx < len; idx++) {
    str += charFromCode(array[idx]);
  }
  return str;
};
var byAscendingId = function(a, b) {
  return a.id - b.id;
};
var sortedUniq = function(array, indexer) {
  var uniq = [];
  for (var idx = 0, len = array.length; idx < len; idx++) {
    var curr = array[idx];
    var prev = array[idx - 1];
    if (idx === 0 || indexer(curr) !== indexer(prev)) {
      uniq.push(curr);
    }
  }
  return uniq;
};
var reverseArray = function(array) {
  var arrayLen = array.length;
  for (var idx = 0, len = Math.floor(arrayLen / 2); idx < len; idx++) {
    var leftIdx = idx;
    var rightIdx = arrayLen - idx - 1;
    var temp = array[idx];
    array[leftIdx] = array[rightIdx];
    array[rightIdx] = temp;
  }
  return array;
};
var sum = function(array) {
  var total = 0;
  for (var idx = 0, len = array.length; idx < len; idx++) {
    total += array[idx];
  }
  return total;
};
var range = function(start, end) {
  var arr = new Array(end - start);
  for (var idx = 0, len = arr.length; idx < len; idx++) {
    arr[idx] = start + idx;
  }
  return arr;
};
var pluckIndices = function(arr, indices) {
  var plucked = new Array(indices.length);
  for (var idx = 0, len = indices.length; idx < len; idx++) {
    plucked[idx] = arr[indices[idx]];
  }
  return plucked;
};
var canBeConvertedToUint8Array = function(input) {
  return input instanceof Uint8Array || input instanceof ArrayBuffer || typeof input === "string";
};
var toUint8Array = function(input) {
  if (typeof input === "string") {
    return decodeFromBase64DataUri(input);
  } else if (input instanceof ArrayBuffer) {
    return new Uint8Array(input);
  } else if (input instanceof Uint8Array) {
    return input;
  } else {
    throw new TypeError("`input` must be one of `string | ArrayBuffer | Uint8Array`");
  }
};
var waitForTick = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      return resolve();
    }, 0);
  });
};
var utf16Encode = function(input, byteOrderMark) {
  if (byteOrderMark === void 0) {
    byteOrderMark = true;
  }
  var encoded = [];
  if (byteOrderMark)
    encoded.push(65279);
  for (var idx = 0, len = input.length; idx < len; ) {
    var codePoint = input.codePointAt(idx);
    if (codePoint < 65536) {
      encoded.push(codePoint);
      idx += 1;
    } else if (codePoint < 1114112) {
      encoded.push(highSurrogate(codePoint), lowSurrogate(codePoint));
      idx += 2;
    } else
      throw new Error("Invalid code point: 0x" + toHexString(codePoint));
  }
  return new Uint16Array(encoded);
};
var isWithinBMP = function(codePoint) {
  return codePoint >= 0 && codePoint <= 65535;
};
var hasSurrogates = function(codePoint) {
  return codePoint >= 65536 && codePoint <= 1114111;
};
var highSurrogate = function(codePoint) {
  return Math.floor((codePoint - 65536) / 1024) + 55296;
};
var lowSurrogate = function(codePoint) {
  return (codePoint - 65536) % 1024 + 56320;
};
var ByteOrder;
(function(ByteOrder2) {
  ByteOrder2["BigEndian"] = "BigEndian";
  ByteOrder2["LittleEndian"] = "LittleEndian";
})(ByteOrder || (ByteOrder = {}));
var REPLACEMENT = "�".codePointAt(0);
var utf16Decode = function(input, byteOrderMark) {
  if (byteOrderMark === void 0) {
    byteOrderMark = true;
  }
  if (input.length <= 1)
    return String.fromCodePoint(REPLACEMENT);
  var byteOrder = byteOrderMark ? readBOM(input) : ByteOrder.BigEndian;
  var idx = byteOrderMark ? 2 : 0;
  var codePoints = [];
  while (input.length - idx >= 2) {
    var first = decodeValues(input[idx++], input[idx++], byteOrder);
    if (isHighSurrogate(first)) {
      if (input.length - idx < 2) {
        codePoints.push(REPLACEMENT);
      } else {
        var second = decodeValues(input[idx++], input[idx++], byteOrder);
        if (isLowSurrogate(second)) {
          codePoints.push(first, second);
        } else {
          codePoints.push(REPLACEMENT);
        }
      }
    } else if (isLowSurrogate(first)) {
      idx += 2;
      codePoints.push(REPLACEMENT);
    } else {
      codePoints.push(first);
    }
  }
  if (idx < input.length)
    codePoints.push(REPLACEMENT);
  return String.fromCodePoint.apply(String, codePoints);
};
var isHighSurrogate = function(codePoint) {
  return codePoint >= 55296 && codePoint <= 56319;
};
var isLowSurrogate = function(codePoint) {
  return codePoint >= 56320 && codePoint <= 57343;
};
var decodeValues = function(first, second, byteOrder) {
  if (byteOrder === ByteOrder.LittleEndian)
    return second << 8 | first;
  if (byteOrder === ByteOrder.BigEndian)
    return first << 8 | second;
  throw new Error("Invalid byteOrder: " + byteOrder);
};
var readBOM = function(bytes) {
  return hasUtf16BigEndianBOM(bytes) ? ByteOrder.BigEndian : hasUtf16LittleEndianBOM(bytes) ? ByteOrder.LittleEndian : ByteOrder.BigEndian;
};
var hasUtf16BigEndianBOM = function(bytes) {
  return bytes[0] === 254 && bytes[1] === 255;
};
var hasUtf16LittleEndianBOM = function(bytes) {
  return bytes[0] === 255 && bytes[1] === 254;
};
var hasUtf16BOM = function(bytes) {
  return hasUtf16BigEndianBOM(bytes) || hasUtf16LittleEndianBOM(bytes);
};
var numberToString = function(num) {
  var numStr = String(num);
  if (Math.abs(num) < 1) {
    var e = parseInt(num.toString().split("e-")[1]);
    if (e) {
      var negative = num < 0;
      if (negative)
        num *= -1;
      num *= Math.pow(10, e - 1);
      numStr = "0." + new Array(e).join("0") + num.toString().substring(2);
      if (negative)
        numStr = "-" + numStr;
    }
  } else {
    var e = parseInt(num.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      num /= Math.pow(10, e);
      numStr = num.toString() + new Array(e + 1).join("0");
    }
  }
  return numStr;
};
var sizeInBytes = function(n) {
  return Math.ceil(n.toString(2).length / 8);
};
var bytesFor = function(n) {
  var bytes = new Uint8Array(sizeInBytes(n));
  for (var i = 1; i <= bytes.length; i++) {
    bytes[i - 1] = n >> (bytes.length - i) * 8;
  }
  return bytes;
};
var error = function(msg) {
  throw new Error(msg);
};
var values = function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var StandardFontValues = values(FontNames);
var isStandardFont = function(input) {
  return StandardFontValues.includes(input);
};
var rectanglesAreEqual = function(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
};
var backtick = function(val) {
  return "`" + val + "`";
};
var singleQuote = function(val) {
  return "'" + val + "'";
};
var formatValue = function(value) {
  var type = typeof value;
  if (type === "string")
    return singleQuote(value);
  else if (type === "undefined")
    return backtick(value);
  else
    return value;
};
var createValueErrorMsg = function(value, valueName, values2) {
  var allowedValues = new Array(values2.length);
  for (var idx = 0, len = values2.length; idx < len; idx++) {
    var v = values2[idx];
    allowedValues[idx] = formatValue(v);
  }
  var joinedValues = allowedValues.join(" or ");
  return backtick(valueName) + " must be one of " + joinedValues + ", but was actually " + formatValue(value);
};
var assertIsOneOf = function(value, valueName, allowedValues) {
  if (!Array.isArray(allowedValues)) {
    allowedValues = values(allowedValues);
  }
  for (var idx = 0, len = allowedValues.length; idx < len; idx++) {
    if (value === allowedValues[idx])
      return;
  }
  throw new TypeError(createValueErrorMsg(value, valueName, allowedValues));
};
var assertIsOneOfOrUndefined = function(value, valueName, allowedValues) {
  if (!Array.isArray(allowedValues)) {
    allowedValues = values(allowedValues);
  }
  assertIsOneOf(value, valueName, allowedValues.concat(void 0));
};
var assertIsSubset = function(values$1, valueName, allowedValues) {
  if (!Array.isArray(allowedValues)) {
    allowedValues = values(allowedValues);
  }
  for (var idx = 0, len = values$1.length; idx < len; idx++) {
    assertIsOneOf(values$1[idx], valueName, allowedValues);
  }
};
var getType = function(val) {
  if (val === null)
    return "null";
  if (val === void 0)
    return "undefined";
  if (typeof val === "string")
    return "string";
  if (isNaN(val))
    return "NaN";
  if (typeof val === "number")
    return "number";
  if (typeof val === "boolean")
    return "boolean";
  if (typeof val === "symbol")
    return "symbol";
  if (typeof val === "bigint")
    return "bigint";
  if (val.constructor && val.constructor.name)
    return val.constructor.name;
  if (val.name)
    return val.name;
  if (val.constructor)
    return String(val.constructor);
  return String(val);
};
var isType = function(value, type) {
  if (type === "null")
    return value === null;
  if (type === "undefined")
    return value === void 0;
  if (type === "string")
    return typeof value === "string";
  if (type === "number")
    return typeof value === "number" && !isNaN(value);
  if (type === "boolean")
    return typeof value === "boolean";
  if (type === "symbol")
    return typeof value === "symbol";
  if (type === "bigint")
    return typeof value === "bigint";
  if (type === Date)
    return value instanceof Date;
  if (type === Array)
    return value instanceof Array;
  if (type === Uint8Array)
    return value instanceof Uint8Array;
  if (type === ArrayBuffer)
    return value instanceof ArrayBuffer;
  if (type === Function)
    return value instanceof Function;
  return value instanceof type[0];
};
var createTypeErrorMsg = function(value, valueName, types) {
  var allowedTypes = new Array(types.length);
  for (var idx = 0, len = types.length; idx < len; idx++) {
    var type = types[idx];
    if (type === "null")
      allowedTypes[idx] = backtick("null");
    if (type === "undefined")
      allowedTypes[idx] = backtick("undefined");
    if (type === "string")
      allowedTypes[idx] = backtick("string");
    else if (type === "number")
      allowedTypes[idx] = backtick("number");
    else if (type === "boolean")
      allowedTypes[idx] = backtick("boolean");
    else if (type === "symbol")
      allowedTypes[idx] = backtick("symbol");
    else if (type === "bigint")
      allowedTypes[idx] = backtick("bigint");
    else if (type === Array)
      allowedTypes[idx] = backtick("Array");
    else if (type === Uint8Array)
      allowedTypes[idx] = backtick("Uint8Array");
    else if (type === ArrayBuffer)
      allowedTypes[idx] = backtick("ArrayBuffer");
    else
      allowedTypes[idx] = backtick(type[1]);
  }
  var joinedTypes = allowedTypes.join(" or ");
  return backtick(valueName) + " must be of type " + joinedTypes + ", but was actually of type " + backtick(getType(value));
};
var assertIs = function(value, valueName, types) {
  for (var idx = 0, len = types.length; idx < len; idx++) {
    if (isType(value, types[idx]))
      return;
  }
  throw new TypeError(createTypeErrorMsg(value, valueName, types));
};
var assertOrUndefined = function(value, valueName, types) {
  assertIs(value, valueName, types.concat("undefined"));
};
var assertEachIs = function(values2, valueName, types) {
  for (var idx = 0, len = values2.length; idx < len; idx++) {
    assertIs(values2[idx], valueName, types);
  }
};
var assertRange = function(value, valueName, min, max) {
  assertIs(value, valueName, ["number"]);
  assertIs(min, "min", ["number"]);
  assertIs(max, "max", ["number"]);
  max = Math.max(min, max);
  if (value < min || value > max) {
    throw new Error(backtick(valueName) + " must be at least " + min + " and at most " + max + ", but was actually " + value);
  }
};
var assertRangeOrUndefined = function(value, valueName, min, max) {
  assertIs(value, valueName, ["number", "undefined"]);
  if (typeof value === "number")
    assertRange(value, valueName, min, max);
};
var assertMultiple = function(value, valueName, multiplier) {
  assertIs(value, valueName, ["number"]);
  if (value % multiplier !== 0) {
    throw new Error(backtick(valueName) + " must be a multiple of " + multiplier + ", but was actually " + value);
  }
};
var assertInteger = function(value, valueName) {
  if (!Number.isInteger(value)) {
    throw new Error(backtick(valueName) + " must be an integer, but was actually " + value);
  }
};
var assertPositive = function(value, valueName) {
  if (![1, 0].includes(Math.sign(value))) {
    throw new Error(backtick(valueName) + " must be a positive number or 0, but was actually " + value);
  }
};
var pdfDocEncodingToUnicode = new Uint16Array(256);
for (var idx$2 = 0; idx$2 < 256; idx$2++) {
  pdfDocEncodingToUnicode[idx$2] = idx$2;
}
pdfDocEncodingToUnicode[22] = toCharCode("");
pdfDocEncodingToUnicode[24] = toCharCode("˘");
pdfDocEncodingToUnicode[25] = toCharCode("ˇ");
pdfDocEncodingToUnicode[26] = toCharCode("ˆ");
pdfDocEncodingToUnicode[27] = toCharCode("˙");
pdfDocEncodingToUnicode[28] = toCharCode("˝");
pdfDocEncodingToUnicode[29] = toCharCode("˛");
pdfDocEncodingToUnicode[30] = toCharCode("˚");
pdfDocEncodingToUnicode[31] = toCharCode("˜");
pdfDocEncodingToUnicode[127] = toCharCode("�");
pdfDocEncodingToUnicode[128] = toCharCode("•");
pdfDocEncodingToUnicode[129] = toCharCode("†");
pdfDocEncodingToUnicode[130] = toCharCode("‡");
pdfDocEncodingToUnicode[131] = toCharCode("…");
pdfDocEncodingToUnicode[132] = toCharCode("—");
pdfDocEncodingToUnicode[133] = toCharCode("–");
pdfDocEncodingToUnicode[134] = toCharCode("ƒ");
pdfDocEncodingToUnicode[135] = toCharCode("⁄");
pdfDocEncodingToUnicode[136] = toCharCode("‹");
pdfDocEncodingToUnicode[137] = toCharCode("›");
pdfDocEncodingToUnicode[138] = toCharCode("−");
pdfDocEncodingToUnicode[139] = toCharCode("‰");
pdfDocEncodingToUnicode[140] = toCharCode("„");
pdfDocEncodingToUnicode[141] = toCharCode("“");
pdfDocEncodingToUnicode[142] = toCharCode("”");
pdfDocEncodingToUnicode[143] = toCharCode("‘");
pdfDocEncodingToUnicode[144] = toCharCode("’");
pdfDocEncodingToUnicode[145] = toCharCode("‚");
pdfDocEncodingToUnicode[146] = toCharCode("™");
pdfDocEncodingToUnicode[147] = toCharCode("ﬁ");
pdfDocEncodingToUnicode[148] = toCharCode("ﬂ");
pdfDocEncodingToUnicode[149] = toCharCode("Ł");
pdfDocEncodingToUnicode[150] = toCharCode("Œ");
pdfDocEncodingToUnicode[151] = toCharCode("Š");
pdfDocEncodingToUnicode[152] = toCharCode("Ÿ");
pdfDocEncodingToUnicode[153] = toCharCode("Ž");
pdfDocEncodingToUnicode[154] = toCharCode("ı");
pdfDocEncodingToUnicode[155] = toCharCode("ł");
pdfDocEncodingToUnicode[156] = toCharCode("œ");
pdfDocEncodingToUnicode[157] = toCharCode("š");
pdfDocEncodingToUnicode[158] = toCharCode("ž");
pdfDocEncodingToUnicode[159] = toCharCode("�");
pdfDocEncodingToUnicode[160] = toCharCode("€");
pdfDocEncodingToUnicode[173] = toCharCode("�");
var pdfDocEncodingDecode = function(bytes) {
  var codePoints = new Array(bytes.length);
  for (var idx = 0, len = bytes.length; idx < len; idx++) {
    codePoints[idx] = pdfDocEncodingToUnicode[bytes[idx]];
  }
  return String.fromCodePoint.apply(String, codePoints);
};
var Cache = (
  /** @class */
  function() {
    function Cache2(populate) {
      this.populate = populate;
      this.value = void 0;
    }
    Cache2.prototype.getValue = function() {
      return this.value;
    };
    Cache2.prototype.access = function() {
      if (!this.value)
        this.value = this.populate();
      return this.value;
    };
    Cache2.prototype.invalidate = function() {
      this.value = void 0;
    };
    Cache2.populatedBy = function(populate) {
      return new Cache2(populate);
    };
    return Cache2;
  }()
);
var MethodNotImplementedError = (
  /** @class */
  function(_super) {
    __extends(MethodNotImplementedError2, _super);
    function MethodNotImplementedError2(className, methodName) {
      var _this = this;
      var msg = "Method " + className + "." + methodName + "() not implemented";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MethodNotImplementedError2;
  }(Error)
);
var PrivateConstructorError = (
  /** @class */
  function(_super) {
    __extends(PrivateConstructorError2, _super);
    function PrivateConstructorError2(className) {
      var _this = this;
      var msg = "Cannot construct " + className + " - it has a private constructor";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PrivateConstructorError2;
  }(Error)
);
var UnexpectedObjectTypeError = (
  /** @class */
  function(_super) {
    __extends(UnexpectedObjectTypeError2, _super);
    function UnexpectedObjectTypeError2(expected, actual) {
      var _this = this;
      var name = function(t) {
        var _a2, _b2;
        return (_a2 = t === null || t === void 0 ? void 0 : t.name) !== null && _a2 !== void 0 ? _a2 : (_b2 = t === null || t === void 0 ? void 0 : t.constructor) === null || _b2 === void 0 ? void 0 : _b2.name;
      };
      var expectedTypes = Array.isArray(expected) ? expected.map(name) : [name(expected)];
      var msg = "Expected instance of " + expectedTypes.join(" or ") + ", " + ("but got instance of " + (actual ? name(actual) : actual));
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return UnexpectedObjectTypeError2;
  }(Error)
);
var UnsupportedEncodingError = (
  /** @class */
  function(_super) {
    __extends(UnsupportedEncodingError2, _super);
    function UnsupportedEncodingError2(encoding) {
      var _this = this;
      var msg = encoding + " stream encoding not supported";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return UnsupportedEncodingError2;
  }(Error)
);
var ReparseError = (
  /** @class */
  function(_super) {
    __extends(ReparseError2, _super);
    function ReparseError2(className, methodName) {
      var _this = this;
      var msg = "Cannot call " + className + "." + methodName + "() more than once";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return ReparseError2;
  }(Error)
);
(function(_super) {
  __extends(MissingCatalogError, _super);
  function MissingCatalogError(ref) {
    var _this = this;
    var msg = "Missing catalog (ref=" + ref + ")";
    _this = _super.call(this, msg) || this;
    return _this;
  }
  return MissingCatalogError;
})(Error);
var MissingPageContentsEmbeddingError = (
  /** @class */
  function(_super) {
    __extends(MissingPageContentsEmbeddingError2, _super);
    function MissingPageContentsEmbeddingError2() {
      var _this = this;
      var msg = "Can't embed page with missing Contents";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingPageContentsEmbeddingError2;
  }(Error)
);
var UnrecognizedStreamTypeError = (
  /** @class */
  function(_super) {
    __extends(UnrecognizedStreamTypeError2, _super);
    function UnrecognizedStreamTypeError2(stream2) {
      var _a2, _b2, _c;
      var _this = this;
      var streamType = (_c = (_b2 = (_a2 = stream2 === null || stream2 === void 0 ? void 0 : stream2.contructor) === null || _a2 === void 0 ? void 0 : _a2.name) !== null && _b2 !== void 0 ? _b2 : stream2 === null || stream2 === void 0 ? void 0 : stream2.name) !== null && _c !== void 0 ? _c : stream2;
      var msg = "Unrecognized stream type: " + streamType;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return UnrecognizedStreamTypeError2;
  }(Error)
);
var PageEmbeddingMismatchedContextError = (
  /** @class */
  function(_super) {
    __extends(PageEmbeddingMismatchedContextError2, _super);
    function PageEmbeddingMismatchedContextError2() {
      var _this = this;
      var msg = "Found mismatched contexts while embedding pages. All pages in the array passed to `PDFDocument.embedPages()` must be from the same document.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PageEmbeddingMismatchedContextError2;
  }(Error)
);
var PDFArrayIsNotRectangleError = (
  /** @class */
  function(_super) {
    __extends(PDFArrayIsNotRectangleError2, _super);
    function PDFArrayIsNotRectangleError2(size) {
      var _this = this;
      var msg = "Attempted to convert PDFArray with " + size + " elements to rectangle, but must have exactly 4 elements.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PDFArrayIsNotRectangleError2;
  }(Error)
);
var InvalidPDFDateStringError = (
  /** @class */
  function(_super) {
    __extends(InvalidPDFDateStringError2, _super);
    function InvalidPDFDateStringError2(value) {
      var _this = this;
      var msg = 'Attempted to convert "' + value + '" to a date, but it does not match the PDF date string format.';
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidPDFDateStringError2;
  }(Error)
);
var InvalidTargetIndexError = (
  /** @class */
  function(_super) {
    __extends(InvalidTargetIndexError2, _super);
    function InvalidTargetIndexError2(targetIndex, Count) {
      var _this = this;
      var msg = "Invalid targetIndex specified: targetIndex=" + targetIndex + " must be less than Count=" + Count;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidTargetIndexError2;
  }(Error)
);
var CorruptPageTreeError = (
  /** @class */
  function(_super) {
    __extends(CorruptPageTreeError2, _super);
    function CorruptPageTreeError2(targetIndex, operation) {
      var _this = this;
      var msg = "Failed to " + operation + " at targetIndex=" + targetIndex + " due to corrupt page tree: It is likely that one or more 'Count' entries are invalid";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return CorruptPageTreeError2;
  }(Error)
);
var IndexOutOfBoundsError = (
  /** @class */
  function(_super) {
    __extends(IndexOutOfBoundsError2, _super);
    function IndexOutOfBoundsError2(index, min, max) {
      var _this = this;
      var msg = "index should be at least " + min + " and at most " + max + ", but was actually " + index;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return IndexOutOfBoundsError2;
  }(Error)
);
var InvalidAcroFieldValueError = (
  /** @class */
  function(_super) {
    __extends(InvalidAcroFieldValueError2, _super);
    function InvalidAcroFieldValueError2() {
      var _this = this;
      var msg = "Attempted to set invalid field value";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidAcroFieldValueError2;
  }(Error)
);
var MultiSelectValueError = (
  /** @class */
  function(_super) {
    __extends(MultiSelectValueError2, _super);
    function MultiSelectValueError2() {
      var _this = this;
      var msg = "Attempted to select multiple values for single-select field";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MultiSelectValueError2;
  }(Error)
);
var MissingDAEntryError = (
  /** @class */
  function(_super) {
    __extends(MissingDAEntryError2, _super);
    function MissingDAEntryError2(fieldName) {
      var _this = this;
      var msg = "No /DA (default appearance) entry found for field: " + fieldName;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingDAEntryError2;
  }(Error)
);
var MissingTfOperatorError = (
  /** @class */
  function(_super) {
    __extends(MissingTfOperatorError2, _super);
    function MissingTfOperatorError2(fieldName) {
      var _this = this;
      var msg = "No Tf operator found for DA of field: " + fieldName;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return MissingTfOperatorError2;
  }(Error)
);
var NumberParsingError = (
  /** @class */
  function(_super) {
    __extends(NumberParsingError2, _super);
    function NumberParsingError2(pos, value) {
      var _this = this;
      var msg = "Failed to parse number " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + '): "' + value + '"');
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return NumberParsingError2;
  }(Error)
);
var PDFParsingError = (
  /** @class */
  function(_super) {
    __extends(PDFParsingError2, _super);
    function PDFParsingError2(pos, details) {
      var _this = this;
      var msg = "Failed to parse PDF document " + ("(line:" + pos.line + " col:" + pos.column + " offset=" + pos.offset + "): " + details);
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return PDFParsingError2;
  }(Error)
);
var NextByteAssertionError = (
  /** @class */
  function(_super) {
    __extends(NextByteAssertionError2, _super);
    function NextByteAssertionError2(pos, expectedByte, actualByte) {
      var _this = this;
      var msg = "Expected next byte to be " + expectedByte + " but it was actually " + actualByte;
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return NextByteAssertionError2;
  }(PDFParsingError)
);
var PDFObjectParsingError = (
  /** @class */
  function(_super) {
    __extends(PDFObjectParsingError2, _super);
    function PDFObjectParsingError2(pos, byte) {
      var _this = this;
      var msg = "Failed to parse PDF object starting with the following byte: " + byte;
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return PDFObjectParsingError2;
  }(PDFParsingError)
);
var PDFInvalidObjectParsingError = (
  /** @class */
  function(_super) {
    __extends(PDFInvalidObjectParsingError2, _super);
    function PDFInvalidObjectParsingError2(pos) {
      var _this = this;
      var msg = "Failed to parse invalid PDF object";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return PDFInvalidObjectParsingError2;
  }(PDFParsingError)
);
var PDFStreamParsingError = (
  /** @class */
  function(_super) {
    __extends(PDFStreamParsingError2, _super);
    function PDFStreamParsingError2(pos) {
      var _this = this;
      var msg = "Failed to parse PDF stream";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return PDFStreamParsingError2;
  }(PDFParsingError)
);
var UnbalancedParenthesisError = (
  /** @class */
  function(_super) {
    __extends(UnbalancedParenthesisError2, _super);
    function UnbalancedParenthesisError2(pos) {
      var _this = this;
      var msg = "Failed to parse PDF literal string due to unbalanced parenthesis";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return UnbalancedParenthesisError2;
  }(PDFParsingError)
);
var StalledParserError = (
  /** @class */
  function(_super) {
    __extends(StalledParserError2, _super);
    function StalledParserError2(pos) {
      var _this = this;
      var msg = "Parser stalled";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return StalledParserError2;
  }(PDFParsingError)
);
var MissingPDFHeaderError = (
  /** @class */
  function(_super) {
    __extends(MissingPDFHeaderError2, _super);
    function MissingPDFHeaderError2(pos) {
      var _this = this;
      var msg = "No PDF header found";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return MissingPDFHeaderError2;
  }(PDFParsingError)
);
var MissingKeywordError = (
  /** @class */
  function(_super) {
    __extends(MissingKeywordError2, _super);
    function MissingKeywordError2(pos, keyword) {
      var _this = this;
      var msg = "Did not find expected keyword '" + arrayAsString(keyword) + "'";
      _this = _super.call(this, pos, msg) || this;
      return _this;
    }
    return MissingKeywordError2;
  }(PDFParsingError)
);
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["Null"] = 0] = "Null";
  CharCodes2[CharCodes2["Backspace"] = 8] = "Backspace";
  CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
  CharCodes2[CharCodes2["Newline"] = 10] = "Newline";
  CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
  CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes2[CharCodes2["Space"] = 32] = "Space";
  CharCodes2[CharCodes2["ExclamationPoint"] = 33] = "ExclamationPoint";
  CharCodes2[CharCodes2["Hash"] = 35] = "Hash";
  CharCodes2[CharCodes2["Percent"] = 37] = "Percent";
  CharCodes2[CharCodes2["LeftParen"] = 40] = "LeftParen";
  CharCodes2[CharCodes2["RightParen"] = 41] = "RightParen";
  CharCodes2[CharCodes2["Plus"] = 43] = "Plus";
  CharCodes2[CharCodes2["Minus"] = 45] = "Minus";
  CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
  CharCodes2[CharCodes2["Period"] = 46] = "Period";
  CharCodes2[CharCodes2["ForwardSlash"] = 47] = "ForwardSlash";
  CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
  CharCodes2[CharCodes2["One"] = 49] = "One";
  CharCodes2[CharCodes2["Two"] = 50] = "Two";
  CharCodes2[CharCodes2["Three"] = 51] = "Three";
  CharCodes2[CharCodes2["Four"] = 52] = "Four";
  CharCodes2[CharCodes2["Five"] = 53] = "Five";
  CharCodes2[CharCodes2["Six"] = 54] = "Six";
  CharCodes2[CharCodes2["Seven"] = 55] = "Seven";
  CharCodes2[CharCodes2["Eight"] = 56] = "Eight";
  CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
  CharCodes2[CharCodes2["LessThan"] = 60] = "LessThan";
  CharCodes2[CharCodes2["GreaterThan"] = 62] = "GreaterThan";
  CharCodes2[CharCodes2["A"] = 65] = "A";
  CharCodes2[CharCodes2["D"] = 68] = "D";
  CharCodes2[CharCodes2["E"] = 69] = "E";
  CharCodes2[CharCodes2["F"] = 70] = "F";
  CharCodes2[CharCodes2["O"] = 79] = "O";
  CharCodes2[CharCodes2["P"] = 80] = "P";
  CharCodes2[CharCodes2["R"] = 82] = "R";
  CharCodes2[CharCodes2["LeftSquareBracket"] = 91] = "LeftSquareBracket";
  CharCodes2[CharCodes2["BackSlash"] = 92] = "BackSlash";
  CharCodes2[CharCodes2["RightSquareBracket"] = 93] = "RightSquareBracket";
  CharCodes2[CharCodes2["a"] = 97] = "a";
  CharCodes2[CharCodes2["b"] = 98] = "b";
  CharCodes2[CharCodes2["d"] = 100] = "d";
  CharCodes2[CharCodes2["e"] = 101] = "e";
  CharCodes2[CharCodes2["f"] = 102] = "f";
  CharCodes2[CharCodes2["i"] = 105] = "i";
  CharCodes2[CharCodes2["j"] = 106] = "j";
  CharCodes2[CharCodes2["l"] = 108] = "l";
  CharCodes2[CharCodes2["m"] = 109] = "m";
  CharCodes2[CharCodes2["n"] = 110] = "n";
  CharCodes2[CharCodes2["o"] = 111] = "o";
  CharCodes2[CharCodes2["r"] = 114] = "r";
  CharCodes2[CharCodes2["s"] = 115] = "s";
  CharCodes2[CharCodes2["t"] = 116] = "t";
  CharCodes2[CharCodes2["u"] = 117] = "u";
  CharCodes2[CharCodes2["x"] = 120] = "x";
  CharCodes2[CharCodes2["LeftCurly"] = 123] = "LeftCurly";
  CharCodes2[CharCodes2["RightCurly"] = 125] = "RightCurly";
  CharCodes2[CharCodes2["Tilde"] = 126] = "Tilde";
})(CharCodes || (CharCodes = {}));
const CharCodes$1 = CharCodes;
var PDFHeader = (
  /** @class */
  function() {
    function PDFHeader2(major, minor) {
      this.major = String(major);
      this.minor = String(minor);
    }
    PDFHeader2.prototype.toString = function() {
      var bc = charFromCode(129);
      return "%PDF-" + this.major + "." + this.minor + "\n%" + bc + bc + bc + bc;
    };
    PDFHeader2.prototype.sizeInBytes = function() {
      return 12 + this.major.length + this.minor.length;
    };
    PDFHeader2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes$1.Percent;
      buffer[offset++] = CharCodes$1.P;
      buffer[offset++] = CharCodes$1.D;
      buffer[offset++] = CharCodes$1.F;
      buffer[offset++] = CharCodes$1.Dash;
      offset += copyStringIntoBuffer(this.major, buffer, offset);
      buffer[offset++] = CharCodes$1.Period;
      offset += copyStringIntoBuffer(this.minor, buffer, offset);
      buffer[offset++] = CharCodes$1.Newline;
      buffer[offset++] = CharCodes$1.Percent;
      buffer[offset++] = 129;
      buffer[offset++] = 129;
      buffer[offset++] = 129;
      buffer[offset++] = 129;
      return offset - initialOffset;
    };
    PDFHeader2.forVersion = function(major, minor) {
      return new PDFHeader2(major, minor);
    };
    return PDFHeader2;
  }()
);
var PDFObject = (
  /** @class */
  function() {
    function PDFObject2() {
    }
    PDFObject2.prototype.clone = function(_context) {
      throw new MethodNotImplementedError(this.constructor.name, "clone");
    };
    PDFObject2.prototype.toString = function() {
      throw new MethodNotImplementedError(this.constructor.name, "toString");
    };
    PDFObject2.prototype.sizeInBytes = function() {
      throw new MethodNotImplementedError(this.constructor.name, "sizeInBytes");
    };
    PDFObject2.prototype.copyBytesInto = function(_buffer, _offset) {
      throw new MethodNotImplementedError(this.constructor.name, "copyBytesInto");
    };
    return PDFObject2;
  }()
);
var PDFNumber = (
  /** @class */
  function(_super) {
    __extends(PDFNumber2, _super);
    function PDFNumber2(value) {
      var _this = _super.call(this) || this;
      _this.numberValue = value;
      _this.stringValue = numberToString(value);
      return _this;
    }
    PDFNumber2.prototype.asNumber = function() {
      return this.numberValue;
    };
    PDFNumber2.prototype.value = function() {
      return this.numberValue;
    };
    PDFNumber2.prototype.clone = function() {
      return PDFNumber2.of(this.numberValue);
    };
    PDFNumber2.prototype.toString = function() {
      return this.stringValue;
    };
    PDFNumber2.prototype.sizeInBytes = function() {
      return this.stringValue.length;
    };
    PDFNumber2.prototype.copyBytesInto = function(buffer, offset) {
      offset += copyStringIntoBuffer(this.stringValue, buffer, offset);
      return this.stringValue.length;
    };
    PDFNumber2.of = function(value) {
      return new PDFNumber2(value);
    };
    return PDFNumber2;
  }(PDFObject)
);
var PDFArray = (
  /** @class */
  function(_super) {
    __extends(PDFArray2, _super);
    function PDFArray2(context) {
      var _this = _super.call(this) || this;
      _this.array = [];
      _this.context = context;
      return _this;
    }
    PDFArray2.prototype.size = function() {
      return this.array.length;
    };
    PDFArray2.prototype.push = function(object2) {
      this.array.push(object2);
    };
    PDFArray2.prototype.insert = function(index, object2) {
      this.array.splice(index, 0, object2);
    };
    PDFArray2.prototype.indexOf = function(object2) {
      var index = this.array.indexOf(object2);
      return index === -1 ? void 0 : index;
    };
    PDFArray2.prototype.remove = function(index) {
      this.array.splice(index, 1);
    };
    PDFArray2.prototype.set = function(idx, object2) {
      this.array[idx] = object2;
    };
    PDFArray2.prototype.get = function(index) {
      return this.array[index];
    };
    PDFArray2.prototype.lookupMaybe = function(index) {
      var _a2;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      return (_a2 = this.context).lookupMaybe.apply(_a2, __spreadArrays([this.get(index)], types));
    };
    PDFArray2.prototype.lookup = function(index) {
      var _a2;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      return (_a2 = this.context).lookup.apply(_a2, __spreadArrays([this.get(index)], types));
    };
    PDFArray2.prototype.asRectangle = function() {
      if (this.size() !== 4)
        throw new PDFArrayIsNotRectangleError(this.size());
      var lowerLeftX = this.lookup(0, PDFNumber).asNumber();
      var lowerLeftY = this.lookup(1, PDFNumber).asNumber();
      var upperRightX = this.lookup(2, PDFNumber).asNumber();
      var upperRightY = this.lookup(3, PDFNumber).asNumber();
      var x = lowerLeftX;
      var y = lowerLeftY;
      var width = upperRightX - lowerLeftX;
      var height = upperRightY - lowerLeftY;
      return { x, y, width, height };
    };
    PDFArray2.prototype.asArray = function() {
      return this.array.slice();
    };
    PDFArray2.prototype.clone = function(context) {
      var clone = PDFArray2.withContext(context || this.context);
      for (var idx = 0, len = this.size(); idx < len; idx++) {
        clone.push(this.array[idx]);
      }
      return clone;
    };
    PDFArray2.prototype.toString = function() {
      var arrayString = "[ ";
      for (var idx = 0, len = this.size(); idx < len; idx++) {
        arrayString += this.get(idx).toString();
        arrayString += " ";
      }
      arrayString += "]";
      return arrayString;
    };
    PDFArray2.prototype.sizeInBytes = function() {
      var size = 3;
      for (var idx = 0, len = this.size(); idx < len; idx++) {
        size += this.get(idx).sizeInBytes() + 1;
      }
      return size;
    };
    PDFArray2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes$1.LeftSquareBracket;
      buffer[offset++] = CharCodes$1.Space;
      for (var idx = 0, len = this.size(); idx < len; idx++) {
        offset += this.get(idx).copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes$1.Space;
      }
      buffer[offset++] = CharCodes$1.RightSquareBracket;
      return offset - initialOffset;
    };
    PDFArray2.prototype.scalePDFNumbers = function(x, y) {
      for (var idx = 0, len = this.size(); idx < len; idx++) {
        var el = this.lookup(idx);
        if (el instanceof PDFNumber) {
          var factor = idx % 2 === 0 ? x : y;
          this.set(idx, PDFNumber.of(el.asNumber() * factor));
        }
      }
    };
    PDFArray2.withContext = function(context) {
      return new PDFArray2(context);
    };
    return PDFArray2;
  }(PDFObject)
);
var ENFORCER$2 = {};
var PDFBool = (
  /** @class */
  function(_super) {
    __extends(PDFBool2, _super);
    function PDFBool2(enforcer, value) {
      var _this = this;
      if (enforcer !== ENFORCER$2)
        throw new PrivateConstructorError("PDFBool");
      _this = _super.call(this) || this;
      _this.value = value;
      return _this;
    }
    PDFBool2.prototype.asBoolean = function() {
      return this.value;
    };
    PDFBool2.prototype.clone = function() {
      return this;
    };
    PDFBool2.prototype.toString = function() {
      return String(this.value);
    };
    PDFBool2.prototype.sizeInBytes = function() {
      return this.value ? 4 : 5;
    };
    PDFBool2.prototype.copyBytesInto = function(buffer, offset) {
      if (this.value) {
        buffer[offset++] = CharCodes$1.t;
        buffer[offset++] = CharCodes$1.r;
        buffer[offset++] = CharCodes$1.u;
        buffer[offset++] = CharCodes$1.e;
        return 4;
      } else {
        buffer[offset++] = CharCodes$1.f;
        buffer[offset++] = CharCodes$1.a;
        buffer[offset++] = CharCodes$1.l;
        buffer[offset++] = CharCodes$1.s;
        buffer[offset++] = CharCodes$1.e;
        return 5;
      }
    };
    PDFBool2.True = new PDFBool2(ENFORCER$2, true);
    PDFBool2.False = new PDFBool2(ENFORCER$2, false);
    return PDFBool2;
  }(PDFObject)
);
var IsDelimiter = new Uint8Array(256);
IsDelimiter[CharCodes$1.LeftParen] = 1;
IsDelimiter[CharCodes$1.RightParen] = 1;
IsDelimiter[CharCodes$1.LessThan] = 1;
IsDelimiter[CharCodes$1.GreaterThan] = 1;
IsDelimiter[CharCodes$1.LeftSquareBracket] = 1;
IsDelimiter[CharCodes$1.RightSquareBracket] = 1;
IsDelimiter[CharCodes$1.LeftCurly] = 1;
IsDelimiter[CharCodes$1.RightCurly] = 1;
IsDelimiter[CharCodes$1.ForwardSlash] = 1;
IsDelimiter[CharCodes$1.Percent] = 1;
var IsWhitespace = new Uint8Array(256);
IsWhitespace[CharCodes$1.Null] = 1;
IsWhitespace[CharCodes$1.Tab] = 1;
IsWhitespace[CharCodes$1.Newline] = 1;
IsWhitespace[CharCodes$1.FormFeed] = 1;
IsWhitespace[CharCodes$1.CarriageReturn] = 1;
IsWhitespace[CharCodes$1.Space] = 1;
var IsIrregular = new Uint8Array(256);
for (var idx$1 = 0, len$1 = 256; idx$1 < len$1; idx$1++) {
  IsIrregular[idx$1] = IsWhitespace[idx$1] || IsDelimiter[idx$1] ? 1 : 0;
}
IsIrregular[CharCodes$1.Hash] = 1;
var decodeName = function(name) {
  return name.replace(/#([\dABCDEF]{2})/g, function(_, hex) {
    return charFromHexCode(hex);
  });
};
var isRegularChar = function(charCode) {
  return charCode >= CharCodes$1.ExclamationPoint && charCode <= CharCodes$1.Tilde && !IsIrregular[charCode];
};
var ENFORCER$1 = {};
var pool$1 = /* @__PURE__ */ new Map();
var PDFName = (
  /** @class */
  function(_super) {
    __extends(PDFName2, _super);
    function PDFName2(enforcer, name) {
      var _this = this;
      if (enforcer !== ENFORCER$1)
        throw new PrivateConstructorError("PDFName");
      _this = _super.call(this) || this;
      var encodedName = "/";
      for (var idx = 0, len = name.length; idx < len; idx++) {
        var character = name[idx];
        var code = toCharCode(character);
        encodedName += isRegularChar(code) ? character : "#" + toHexString(code);
      }
      _this.encodedName = encodedName;
      return _this;
    }
    PDFName2.prototype.asBytes = function() {
      var bytes = [];
      var hex = "";
      var escaped = false;
      var pushByte = function(byte2) {
        if (byte2 !== void 0)
          bytes.push(byte2);
        escaped = false;
      };
      for (var idx = 1, len = this.encodedName.length; idx < len; idx++) {
        var char = this.encodedName[idx];
        var byte = toCharCode(char);
        var nextChar = this.encodedName[idx + 1];
        if (!escaped) {
          if (byte === CharCodes$1.Hash)
            escaped = true;
          else
            pushByte(byte);
        } else {
          if (byte >= CharCodes$1.Zero && byte <= CharCodes$1.Nine || byte >= CharCodes$1.a && byte <= CharCodes$1.f || byte >= CharCodes$1.A && byte <= CharCodes$1.F) {
            hex += char;
            if (hex.length === 2 || !(nextChar >= "0" && nextChar <= "9" || nextChar >= "a" && nextChar <= "f" || nextChar >= "A" && nextChar <= "F")) {
              pushByte(parseInt(hex, 16));
              hex = "";
            }
          } else {
            pushByte(byte);
          }
        }
      }
      return new Uint8Array(bytes);
    };
    PDFName2.prototype.decodeText = function() {
      var bytes = this.asBytes();
      return String.fromCharCode.apply(String, Array.from(bytes));
    };
    PDFName2.prototype.asString = function() {
      return this.encodedName;
    };
    PDFName2.prototype.value = function() {
      return this.encodedName;
    };
    PDFName2.prototype.clone = function() {
      return this;
    };
    PDFName2.prototype.toString = function() {
      return this.encodedName;
    };
    PDFName2.prototype.sizeInBytes = function() {
      return this.encodedName.length;
    };
    PDFName2.prototype.copyBytesInto = function(buffer, offset) {
      offset += copyStringIntoBuffer(this.encodedName, buffer, offset);
      return this.encodedName.length;
    };
    PDFName2.of = function(name) {
      var decodedValue = decodeName(name);
      var instance = pool$1.get(decodedValue);
      if (!instance) {
        instance = new PDFName2(ENFORCER$1, decodedValue);
        pool$1.set(decodedValue, instance);
      }
      return instance;
    };
    PDFName2.Length = PDFName2.of("Length");
    PDFName2.FlateDecode = PDFName2.of("FlateDecode");
    PDFName2.Resources = PDFName2.of("Resources");
    PDFName2.Font = PDFName2.of("Font");
    PDFName2.XObject = PDFName2.of("XObject");
    PDFName2.ExtGState = PDFName2.of("ExtGState");
    PDFName2.Contents = PDFName2.of("Contents");
    PDFName2.Type = PDFName2.of("Type");
    PDFName2.Parent = PDFName2.of("Parent");
    PDFName2.MediaBox = PDFName2.of("MediaBox");
    PDFName2.Page = PDFName2.of("Page");
    PDFName2.Annots = PDFName2.of("Annots");
    PDFName2.TrimBox = PDFName2.of("TrimBox");
    PDFName2.ArtBox = PDFName2.of("ArtBox");
    PDFName2.BleedBox = PDFName2.of("BleedBox");
    PDFName2.CropBox = PDFName2.of("CropBox");
    PDFName2.Rotate = PDFName2.of("Rotate");
    PDFName2.Title = PDFName2.of("Title");
    PDFName2.Author = PDFName2.of("Author");
    PDFName2.Subject = PDFName2.of("Subject");
    PDFName2.Creator = PDFName2.of("Creator");
    PDFName2.Keywords = PDFName2.of("Keywords");
    PDFName2.Producer = PDFName2.of("Producer");
    PDFName2.CreationDate = PDFName2.of("CreationDate");
    PDFName2.ModDate = PDFName2.of("ModDate");
    return PDFName2;
  }(PDFObject)
);
var PDFNull = (
  /** @class */
  function(_super) {
    __extends(PDFNull2, _super);
    function PDFNull2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFNull2.prototype.asNull = function() {
      return null;
    };
    PDFNull2.prototype.clone = function() {
      return this;
    };
    PDFNull2.prototype.toString = function() {
      return "null";
    };
    PDFNull2.prototype.sizeInBytes = function() {
      return 4;
    };
    PDFNull2.prototype.copyBytesInto = function(buffer, offset) {
      buffer[offset++] = CharCodes$1.n;
      buffer[offset++] = CharCodes$1.u;
      buffer[offset++] = CharCodes$1.l;
      buffer[offset++] = CharCodes$1.l;
      return 4;
    };
    return PDFNull2;
  }(PDFObject)
);
const PDFNull$1 = new PDFNull();
var PDFDict = (
  /** @class */
  function(_super) {
    __extends(PDFDict2, _super);
    function PDFDict2(map, context) {
      var _this = _super.call(this) || this;
      _this.dict = map;
      _this.context = context;
      return _this;
    }
    PDFDict2.prototype.keys = function() {
      return Array.from(this.dict.keys());
    };
    PDFDict2.prototype.values = function() {
      return Array.from(this.dict.values());
    };
    PDFDict2.prototype.entries = function() {
      return Array.from(this.dict.entries());
    };
    PDFDict2.prototype.set = function(key, value) {
      this.dict.set(key, value);
    };
    PDFDict2.prototype.get = function(key, preservePDFNull) {
      if (preservePDFNull === void 0) {
        preservePDFNull = false;
      }
      var value = this.dict.get(key);
      if (value === PDFNull$1 && !preservePDFNull)
        return void 0;
      return value;
    };
    PDFDict2.prototype.has = function(key) {
      var value = this.dict.get(key);
      return value !== void 0 && value !== PDFNull$1;
    };
    PDFDict2.prototype.lookupMaybe = function(key) {
      var _a2;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var preservePDFNull = types.includes(PDFNull$1);
      var value = (_a2 = this.context).lookupMaybe.apply(_a2, __spreadArrays([this.get(key, preservePDFNull)], types));
      if (value === PDFNull$1 && !preservePDFNull)
        return void 0;
      return value;
    };
    PDFDict2.prototype.lookup = function(key) {
      var _a2;
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var preservePDFNull = types.includes(PDFNull$1);
      var value = (_a2 = this.context).lookup.apply(_a2, __spreadArrays([this.get(key, preservePDFNull)], types));
      if (value === PDFNull$1 && !preservePDFNull)
        return void 0;
      return value;
    };
    PDFDict2.prototype.delete = function(key) {
      return this.dict.delete(key);
    };
    PDFDict2.prototype.asMap = function() {
      return new Map(this.dict);
    };
    PDFDict2.prototype.uniqueKey = function(tag) {
      if (tag === void 0) {
        tag = "";
      }
      var existingKeys = this.keys();
      var key = PDFName.of(this.context.addRandomSuffix(tag, 10));
      while (existingKeys.includes(key)) {
        key = PDFName.of(this.context.addRandomSuffix(tag, 10));
      }
      return key;
    };
    PDFDict2.prototype.clone = function(context) {
      var clone = PDFDict2.withContext(context || this.context);
      var entries = this.entries();
      for (var idx = 0, len = entries.length; idx < len; idx++) {
        var _a2 = entries[idx], key = _a2[0], value = _a2[1];
        clone.set(key, value);
      }
      return clone;
    };
    PDFDict2.prototype.toString = function() {
      var dictString = "<<\n";
      var entries = this.entries();
      for (var idx = 0, len = entries.length; idx < len; idx++) {
        var _a2 = entries[idx], key = _a2[0], value = _a2[1];
        dictString += key.toString() + " " + value.toString() + "\n";
      }
      dictString += ">>";
      return dictString;
    };
    PDFDict2.prototype.sizeInBytes = function() {
      var size = 5;
      var entries = this.entries();
      for (var idx = 0, len = entries.length; idx < len; idx++) {
        var _a2 = entries[idx], key = _a2[0], value = _a2[1];
        size += key.sizeInBytes() + value.sizeInBytes() + 2;
      }
      return size;
    };
    PDFDict2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes$1.LessThan;
      buffer[offset++] = CharCodes$1.LessThan;
      buffer[offset++] = CharCodes$1.Newline;
      var entries = this.entries();
      for (var idx = 0, len = entries.length; idx < len; idx++) {
        var _a2 = entries[idx], key = _a2[0], value = _a2[1];
        offset += key.copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes$1.Space;
        offset += value.copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes$1.Newline;
      }
      buffer[offset++] = CharCodes$1.GreaterThan;
      buffer[offset++] = CharCodes$1.GreaterThan;
      return offset - initialOffset;
    };
    PDFDict2.withContext = function(context) {
      return new PDFDict2(/* @__PURE__ */ new Map(), context);
    };
    PDFDict2.fromMapWithContext = function(map, context) {
      return new PDFDict2(map, context);
    };
    return PDFDict2;
  }(PDFObject)
);
var PDFStream = (
  /** @class */
  function(_super) {
    __extends(PDFStream2, _super);
    function PDFStream2(dict) {
      var _this = _super.call(this) || this;
      _this.dict = dict;
      return _this;
    }
    PDFStream2.prototype.clone = function(_context) {
      throw new MethodNotImplementedError(this.constructor.name, "clone");
    };
    PDFStream2.prototype.getContentsString = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getContentsString");
    };
    PDFStream2.prototype.getContents = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getContents");
    };
    PDFStream2.prototype.getContentsSize = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getContentsSize");
    };
    PDFStream2.prototype.updateDict = function() {
      var contentsSize = this.getContentsSize();
      this.dict.set(PDFName.Length, PDFNumber.of(contentsSize));
    };
    PDFStream2.prototype.sizeInBytes = function() {
      this.updateDict();
      return this.dict.sizeInBytes() + this.getContentsSize() + 18;
    };
    PDFStream2.prototype.toString = function() {
      this.updateDict();
      var streamString = this.dict.toString();
      streamString += "\nstream\n";
      streamString += this.getContentsString();
      streamString += "\nendstream";
      return streamString;
    };
    PDFStream2.prototype.copyBytesInto = function(buffer, offset) {
      this.updateDict();
      var initialOffset = offset;
      offset += this.dict.copyBytesInto(buffer, offset);
      buffer[offset++] = CharCodes$1.Newline;
      buffer[offset++] = CharCodes$1.s;
      buffer[offset++] = CharCodes$1.t;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.e;
      buffer[offset++] = CharCodes$1.a;
      buffer[offset++] = CharCodes$1.m;
      buffer[offset++] = CharCodes$1.Newline;
      var contents = this.getContents();
      for (var idx = 0, len = contents.length; idx < len; idx++) {
        buffer[offset++] = contents[idx];
      }
      buffer[offset++] = CharCodes$1.Newline;
      buffer[offset++] = CharCodes$1.e;
      buffer[offset++] = CharCodes$1.n;
      buffer[offset++] = CharCodes$1.d;
      buffer[offset++] = CharCodes$1.s;
      buffer[offset++] = CharCodes$1.t;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.e;
      buffer[offset++] = CharCodes$1.a;
      buffer[offset++] = CharCodes$1.m;
      return offset - initialOffset;
    };
    return PDFStream2;
  }(PDFObject)
);
var PDFRawStream = (
  /** @class */
  function(_super) {
    __extends(PDFRawStream2, _super);
    function PDFRawStream2(dict, contents) {
      var _this = _super.call(this, dict) || this;
      _this.contents = contents;
      return _this;
    }
    PDFRawStream2.prototype.asUint8Array = function() {
      return this.contents.slice();
    };
    PDFRawStream2.prototype.clone = function(context) {
      return PDFRawStream2.of(this.dict.clone(context), this.contents.slice());
    };
    PDFRawStream2.prototype.getContentsString = function() {
      return arrayAsString(this.contents);
    };
    PDFRawStream2.prototype.getContents = function() {
      return this.contents;
    };
    PDFRawStream2.prototype.getContentsSize = function() {
      return this.contents.length;
    };
    PDFRawStream2.of = function(dict, contents) {
      return new PDFRawStream2(dict, contents);
    };
    return PDFRawStream2;
  }(PDFStream)
);
var ENFORCER = {};
var pool = /* @__PURE__ */ new Map();
var PDFRef = (
  /** @class */
  function(_super) {
    __extends(PDFRef2, _super);
    function PDFRef2(enforcer, objectNumber, generationNumber) {
      var _this = this;
      if (enforcer !== ENFORCER)
        throw new PrivateConstructorError("PDFRef");
      _this = _super.call(this) || this;
      _this.objectNumber = objectNumber;
      _this.generationNumber = generationNumber;
      _this.tag = objectNumber + " " + generationNumber + " R";
      return _this;
    }
    PDFRef2.prototype.clone = function() {
      return this;
    };
    PDFRef2.prototype.toString = function() {
      return this.tag;
    };
    PDFRef2.prototype.sizeInBytes = function() {
      return this.tag.length;
    };
    PDFRef2.prototype.copyBytesInto = function(buffer, offset) {
      offset += copyStringIntoBuffer(this.tag, buffer, offset);
      return this.tag.length;
    };
    PDFRef2.of = function(objectNumber, generationNumber) {
      if (generationNumber === void 0) {
        generationNumber = 0;
      }
      var tag = objectNumber + " " + generationNumber + " R";
      var instance = pool.get(tag);
      if (!instance) {
        instance = new PDFRef2(ENFORCER, objectNumber, generationNumber);
        pool.set(tag, instance);
      }
      return instance;
    };
    return PDFRef2;
  }(PDFObject)
);
var PDFOperator = (
  /** @class */
  function() {
    function PDFOperator2(name, args) {
      this.name = name;
      this.args = args || [];
    }
    PDFOperator2.prototype.clone = function(context) {
      var args = new Array(this.args.length);
      for (var idx = 0, len = args.length; idx < len; idx++) {
        var arg = this.args[idx];
        args[idx] = arg instanceof PDFObject ? arg.clone(context) : arg;
      }
      return PDFOperator2.of(this.name, args);
    };
    PDFOperator2.prototype.toString = function() {
      var value = "";
      for (var idx = 0, len = this.args.length; idx < len; idx++) {
        value += String(this.args[idx]) + " ";
      }
      value += this.name;
      return value;
    };
    PDFOperator2.prototype.sizeInBytes = function() {
      var size = 0;
      for (var idx = 0, len = this.args.length; idx < len; idx++) {
        var arg = this.args[idx];
        size += (arg instanceof PDFObject ? arg.sizeInBytes() : arg.length) + 1;
      }
      size += this.name.length;
      return size;
    };
    PDFOperator2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      for (var idx = 0, len = this.args.length; idx < len; idx++) {
        var arg = this.args[idx];
        if (arg instanceof PDFObject) {
          offset += arg.copyBytesInto(buffer, offset);
        } else {
          offset += copyStringIntoBuffer(arg, buffer, offset);
        }
        buffer[offset++] = CharCodes$1.Space;
      }
      offset += copyStringIntoBuffer(this.name, buffer, offset);
      return offset - initialOffset;
    };
    PDFOperator2.of = function(name, args) {
      return new PDFOperator2(name, args);
    };
    return PDFOperator2;
  }()
);
var PDFOperatorNames;
(function(PDFOperatorNames2) {
  PDFOperatorNames2["NonStrokingColor"] = "sc";
  PDFOperatorNames2["NonStrokingColorN"] = "scn";
  PDFOperatorNames2["NonStrokingColorRgb"] = "rg";
  PDFOperatorNames2["NonStrokingColorGray"] = "g";
  PDFOperatorNames2["NonStrokingColorCmyk"] = "k";
  PDFOperatorNames2["NonStrokingColorspace"] = "cs";
  PDFOperatorNames2["StrokingColor"] = "SC";
  PDFOperatorNames2["StrokingColorN"] = "SCN";
  PDFOperatorNames2["StrokingColorRgb"] = "RG";
  PDFOperatorNames2["StrokingColorGray"] = "G";
  PDFOperatorNames2["StrokingColorCmyk"] = "K";
  PDFOperatorNames2["StrokingColorspace"] = "CS";
  PDFOperatorNames2["BeginMarkedContentSequence"] = "BDC";
  PDFOperatorNames2["BeginMarkedContent"] = "BMC";
  PDFOperatorNames2["EndMarkedContent"] = "EMC";
  PDFOperatorNames2["MarkedContentPointWithProps"] = "DP";
  PDFOperatorNames2["MarkedContentPoint"] = "MP";
  PDFOperatorNames2["DrawObject"] = "Do";
  PDFOperatorNames2["ConcatTransformationMatrix"] = "cm";
  PDFOperatorNames2["PopGraphicsState"] = "Q";
  PDFOperatorNames2["PushGraphicsState"] = "q";
  PDFOperatorNames2["SetFlatness"] = "i";
  PDFOperatorNames2["SetGraphicsStateParams"] = "gs";
  PDFOperatorNames2["SetLineCapStyle"] = "J";
  PDFOperatorNames2["SetLineDashPattern"] = "d";
  PDFOperatorNames2["SetLineJoinStyle"] = "j";
  PDFOperatorNames2["SetLineMiterLimit"] = "M";
  PDFOperatorNames2["SetLineWidth"] = "w";
  PDFOperatorNames2["SetTextMatrix"] = "Tm";
  PDFOperatorNames2["SetRenderingIntent"] = "ri";
  PDFOperatorNames2["AppendRectangle"] = "re";
  PDFOperatorNames2["BeginInlineImage"] = "BI";
  PDFOperatorNames2["BeginInlineImageData"] = "ID";
  PDFOperatorNames2["EndInlineImage"] = "EI";
  PDFOperatorNames2["ClipEvenOdd"] = "W*";
  PDFOperatorNames2["ClipNonZero"] = "W";
  PDFOperatorNames2["CloseAndStroke"] = "s";
  PDFOperatorNames2["CloseFillEvenOddAndStroke"] = "b*";
  PDFOperatorNames2["CloseFillNonZeroAndStroke"] = "b";
  PDFOperatorNames2["ClosePath"] = "h";
  PDFOperatorNames2["AppendBezierCurve"] = "c";
  PDFOperatorNames2["CurveToReplicateFinalPoint"] = "y";
  PDFOperatorNames2["CurveToReplicateInitialPoint"] = "v";
  PDFOperatorNames2["EndPath"] = "n";
  PDFOperatorNames2["FillEvenOddAndStroke"] = "B*";
  PDFOperatorNames2["FillEvenOdd"] = "f*";
  PDFOperatorNames2["FillNonZeroAndStroke"] = "B";
  PDFOperatorNames2["FillNonZero"] = "f";
  PDFOperatorNames2["LegacyFillNonZero"] = "F";
  PDFOperatorNames2["LineTo"] = "l";
  PDFOperatorNames2["MoveTo"] = "m";
  PDFOperatorNames2["ShadingFill"] = "sh";
  PDFOperatorNames2["StrokePath"] = "S";
  PDFOperatorNames2["BeginText"] = "BT";
  PDFOperatorNames2["EndText"] = "ET";
  PDFOperatorNames2["MoveText"] = "Td";
  PDFOperatorNames2["MoveTextSetLeading"] = "TD";
  PDFOperatorNames2["NextLine"] = "T*";
  PDFOperatorNames2["SetCharacterSpacing"] = "Tc";
  PDFOperatorNames2["SetFontAndSize"] = "Tf";
  PDFOperatorNames2["SetTextHorizontalScaling"] = "Tz";
  PDFOperatorNames2["SetTextLineHeight"] = "TL";
  PDFOperatorNames2["SetTextRenderingMode"] = "Tr";
  PDFOperatorNames2["SetTextRise"] = "Ts";
  PDFOperatorNames2["SetWordSpacing"] = "Tw";
  PDFOperatorNames2["ShowText"] = "Tj";
  PDFOperatorNames2["ShowTextAdjusted"] = "TJ";
  PDFOperatorNames2["ShowTextLine"] = "'";
  PDFOperatorNames2["ShowTextLineAndSpace"] = '"';
  PDFOperatorNames2["Type3D0"] = "d0";
  PDFOperatorNames2["Type3D1"] = "d1";
  PDFOperatorNames2["BeginCompatibilitySection"] = "BX";
  PDFOperatorNames2["EndCompatibilitySection"] = "EX";
})(PDFOperatorNames || (PDFOperatorNames = {}));
const Ops = PDFOperatorNames;
var PDFFlateStream = (
  /** @class */
  function(_super) {
    __extends(PDFFlateStream2, _super);
    function PDFFlateStream2(dict, encode) {
      var _this = _super.call(this, dict) || this;
      _this.computeContents = function() {
        var unencodedContents = _this.getUnencodedContents();
        return _this.encode ? pako$1.deflate(unencodedContents) : unencodedContents;
      };
      _this.encode = encode;
      if (encode)
        dict.set(PDFName.of("Filter"), PDFName.of("FlateDecode"));
      _this.contentsCache = Cache.populatedBy(_this.computeContents);
      return _this;
    }
    PDFFlateStream2.prototype.getContents = function() {
      return this.contentsCache.access();
    };
    PDFFlateStream2.prototype.getContentsSize = function() {
      return this.contentsCache.access().length;
    };
    PDFFlateStream2.prototype.getUnencodedContents = function() {
      throw new MethodNotImplementedError(this.constructor.name, "getUnencodedContents");
    };
    return PDFFlateStream2;
  }(PDFStream)
);
var PDFContentStream = (
  /** @class */
  function(_super) {
    __extends(PDFContentStream2, _super);
    function PDFContentStream2(dict, operators, encode) {
      if (encode === void 0) {
        encode = true;
      }
      var _this = _super.call(this, dict, encode) || this;
      _this.operators = operators;
      return _this;
    }
    PDFContentStream2.prototype.push = function() {
      var _a2;
      var operators = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operators[_i] = arguments[_i];
      }
      (_a2 = this.operators).push.apply(_a2, operators);
    };
    PDFContentStream2.prototype.clone = function(context) {
      var operators = new Array(this.operators.length);
      for (var idx = 0, len = this.operators.length; idx < len; idx++) {
        operators[idx] = this.operators[idx].clone(context);
      }
      var _a2 = this, dict = _a2.dict, encode = _a2.encode;
      return PDFContentStream2.of(dict.clone(context), operators, encode);
    };
    PDFContentStream2.prototype.getContentsString = function() {
      var value = "";
      for (var idx = 0, len = this.operators.length; idx < len; idx++) {
        value += this.operators[idx] + "\n";
      }
      return value;
    };
    PDFContentStream2.prototype.getUnencodedContents = function() {
      var buffer = new Uint8Array(this.getUnencodedContentsSize());
      var offset = 0;
      for (var idx = 0, len = this.operators.length; idx < len; idx++) {
        offset += this.operators[idx].copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes$1.Newline;
      }
      return buffer;
    };
    PDFContentStream2.prototype.getUnencodedContentsSize = function() {
      var size = 0;
      for (var idx = 0, len = this.operators.length; idx < len; idx++) {
        size += this.operators[idx].sizeInBytes() + 1;
      }
      return size;
    };
    PDFContentStream2.of = function(dict, operators, encode) {
      if (encode === void 0) {
        encode = true;
      }
      return new PDFContentStream2(dict, operators, encode);
    };
    return PDFContentStream2;
  }(PDFFlateStream)
);
var SimpleRNG = (
  /** @class */
  function() {
    function SimpleRNG2(seed) {
      this.seed = seed;
    }
    SimpleRNG2.prototype.nextInt = function() {
      var x = Math.sin(this.seed++) * 1e4;
      return x - Math.floor(x);
    };
    SimpleRNG2.withSeed = function(seed) {
      return new SimpleRNG2(seed);
    };
    return SimpleRNG2;
  }()
);
var byAscendingObjectNumber = function(_a2, _b2) {
  var a = _a2[0];
  var b = _b2[0];
  return a.objectNumber - b.objectNumber;
};
var PDFContext = (
  /** @class */
  function() {
    function PDFContext2() {
      this.largestObjectNumber = 0;
      this.header = PDFHeader.forVersion(1, 7);
      this.trailerInfo = {};
      this.indirectObjects = /* @__PURE__ */ new Map();
      this.rng = SimpleRNG.withSeed(1);
    }
    PDFContext2.prototype.assign = function(ref, object2) {
      this.indirectObjects.set(ref, object2);
      if (ref.objectNumber > this.largestObjectNumber) {
        this.largestObjectNumber = ref.objectNumber;
      }
    };
    PDFContext2.prototype.nextRef = function() {
      this.largestObjectNumber += 1;
      return PDFRef.of(this.largestObjectNumber);
    };
    PDFContext2.prototype.register = function(object2) {
      var ref = this.nextRef();
      this.assign(ref, object2);
      return ref;
    };
    PDFContext2.prototype.delete = function(ref) {
      return this.indirectObjects.delete(ref);
    };
    PDFContext2.prototype.lookupMaybe = function(ref) {
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var preservePDFNull = types.includes(PDFNull$1);
      var result = ref instanceof PDFRef ? this.indirectObjects.get(ref) : ref;
      if (!result || result === PDFNull$1 && !preservePDFNull)
        return void 0;
      for (var idx = 0, len = types.length; idx < len; idx++) {
        var type = types[idx];
        if (type === PDFNull$1) {
          if (result === PDFNull$1)
            return result;
        } else {
          if (result instanceof type)
            return result;
        }
      }
      throw new UnexpectedObjectTypeError(types, result);
    };
    PDFContext2.prototype.lookup = function(ref) {
      var types = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
      }
      var result = ref instanceof PDFRef ? this.indirectObjects.get(ref) : ref;
      if (types.length === 0)
        return result;
      for (var idx = 0, len = types.length; idx < len; idx++) {
        var type = types[idx];
        if (type === PDFNull$1) {
          if (result === PDFNull$1)
            return result;
        } else {
          if (result instanceof type)
            return result;
        }
      }
      throw new UnexpectedObjectTypeError(types, result);
    };
    PDFContext2.prototype.getObjectRef = function(pdfObject) {
      var entries = Array.from(this.indirectObjects.entries());
      for (var idx = 0, len = entries.length; idx < len; idx++) {
        var _a2 = entries[idx], ref = _a2[0], object2 = _a2[1];
        if (object2 === pdfObject) {
          return ref;
        }
      }
      return void 0;
    };
    PDFContext2.prototype.enumerateIndirectObjects = function() {
      return Array.from(this.indirectObjects.entries()).sort(byAscendingObjectNumber);
    };
    PDFContext2.prototype.obj = function(literal) {
      if (literal instanceof PDFObject) {
        return literal;
      } else if (literal === null || literal === void 0) {
        return PDFNull$1;
      } else if (typeof literal === "string") {
        return PDFName.of(literal);
      } else if (typeof literal === "number") {
        return PDFNumber.of(literal);
      } else if (typeof literal === "boolean") {
        return literal ? PDFBool.True : PDFBool.False;
      } else if (Array.isArray(literal)) {
        var array = PDFArray.withContext(this);
        for (var idx = 0, len = literal.length; idx < len; idx++) {
          array.push(this.obj(literal[idx]));
        }
        return array;
      } else {
        var dict = PDFDict.withContext(this);
        var keys = Object.keys(literal);
        for (var idx = 0, len = keys.length; idx < len; idx++) {
          var key = keys[idx];
          var value = literal[key];
          if (value !== void 0)
            dict.set(PDFName.of(key), this.obj(value));
        }
        return dict;
      }
    };
    PDFContext2.prototype.stream = function(contents, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return PDFRawStream.of(this.obj(dict), typedArrayFor(contents));
    };
    PDFContext2.prototype.flateStream = function(contents, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return this.stream(pako$1.deflate(typedArrayFor(contents)), __assign(__assign({}, dict), { Filter: "FlateDecode" }));
    };
    PDFContext2.prototype.contentStream = function(operators, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return PDFContentStream.of(this.obj(dict), operators);
    };
    PDFContext2.prototype.formXObject = function(operators, dict) {
      if (dict === void 0) {
        dict = {};
      }
      return this.contentStream(operators, __assign(__assign({ BBox: this.obj([0, 0, 0, 0]), Matrix: this.obj([1, 0, 0, 1, 0, 0]) }, dict), { Type: "XObject", Subtype: "Form" }));
    };
    PDFContext2.prototype.getPushGraphicsStateContentStream = function() {
      if (this.pushGraphicsStateContentStreamRef) {
        return this.pushGraphicsStateContentStreamRef;
      }
      var dict = this.obj({});
      var op = PDFOperator.of(Ops.PushGraphicsState);
      var stream2 = PDFContentStream.of(dict, [op]);
      this.pushGraphicsStateContentStreamRef = this.register(stream2);
      return this.pushGraphicsStateContentStreamRef;
    };
    PDFContext2.prototype.getPopGraphicsStateContentStream = function() {
      if (this.popGraphicsStateContentStreamRef) {
        return this.popGraphicsStateContentStreamRef;
      }
      var dict = this.obj({});
      var op = PDFOperator.of(Ops.PopGraphicsState);
      var stream2 = PDFContentStream.of(dict, [op]);
      this.popGraphicsStateContentStreamRef = this.register(stream2);
      return this.popGraphicsStateContentStreamRef;
    };
    PDFContext2.prototype.addRandomSuffix = function(prefix, suffixLength) {
      if (suffixLength === void 0) {
        suffixLength = 4;
      }
      return prefix + "-" + Math.floor(this.rng.nextInt() * Math.pow(10, suffixLength));
    };
    PDFContext2.create = function() {
      return new PDFContext2();
    };
    return PDFContext2;
  }()
);
var PDFPageLeaf = (
  /** @class */
  function(_super) {
    __extends(PDFPageLeaf2, _super);
    function PDFPageLeaf2(map, context, autoNormalizeCTM) {
      if (autoNormalizeCTM === void 0) {
        autoNormalizeCTM = true;
      }
      var _this = _super.call(this, map, context) || this;
      _this.normalized = false;
      _this.autoNormalizeCTM = autoNormalizeCTM;
      return _this;
    }
    PDFPageLeaf2.prototype.clone = function(context) {
      var clone = PDFPageLeaf2.fromMapWithContext(/* @__PURE__ */ new Map(), context || this.context, this.autoNormalizeCTM);
      var entries = this.entries();
      for (var idx = 0, len = entries.length; idx < len; idx++) {
        var _a2 = entries[idx], key = _a2[0], value = _a2[1];
        clone.set(key, value);
      }
      return clone;
    };
    PDFPageLeaf2.prototype.Parent = function() {
      return this.lookupMaybe(PDFName.Parent, PDFDict);
    };
    PDFPageLeaf2.prototype.Contents = function() {
      return this.lookup(PDFName.of("Contents"));
    };
    PDFPageLeaf2.prototype.Annots = function() {
      return this.lookupMaybe(PDFName.Annots, PDFArray);
    };
    PDFPageLeaf2.prototype.BleedBox = function() {
      return this.lookupMaybe(PDFName.BleedBox, PDFArray);
    };
    PDFPageLeaf2.prototype.TrimBox = function() {
      return this.lookupMaybe(PDFName.TrimBox, PDFArray);
    };
    PDFPageLeaf2.prototype.ArtBox = function() {
      return this.lookupMaybe(PDFName.ArtBox, PDFArray);
    };
    PDFPageLeaf2.prototype.Resources = function() {
      var dictOrRef = this.getInheritableAttribute(PDFName.Resources);
      return this.context.lookupMaybe(dictOrRef, PDFDict);
    };
    PDFPageLeaf2.prototype.MediaBox = function() {
      var arrayOrRef = this.getInheritableAttribute(PDFName.MediaBox);
      return this.context.lookup(arrayOrRef, PDFArray);
    };
    PDFPageLeaf2.prototype.CropBox = function() {
      var arrayOrRef = this.getInheritableAttribute(PDFName.CropBox);
      return this.context.lookupMaybe(arrayOrRef, PDFArray);
    };
    PDFPageLeaf2.prototype.Rotate = function() {
      var numberOrRef = this.getInheritableAttribute(PDFName.Rotate);
      return this.context.lookupMaybe(numberOrRef, PDFNumber);
    };
    PDFPageLeaf2.prototype.getInheritableAttribute = function(name) {
      var attribute;
      this.ascend(function(node) {
        if (!attribute)
          attribute = node.get(name);
      });
      return attribute;
    };
    PDFPageLeaf2.prototype.setParent = function(parentRef) {
      this.set(PDFName.Parent, parentRef);
    };
    PDFPageLeaf2.prototype.addContentStream = function(contentStreamRef) {
      var Contents = this.normalizedEntries().Contents || this.context.obj([]);
      this.set(PDFName.Contents, Contents);
      Contents.push(contentStreamRef);
    };
    PDFPageLeaf2.prototype.wrapContentStreams = function(startStream, endStream) {
      var Contents = this.Contents();
      if (Contents instanceof PDFArray) {
        Contents.insert(0, startStream);
        Contents.push(endStream);
        return true;
      }
      return false;
    };
    PDFPageLeaf2.prototype.addAnnot = function(annotRef) {
      var Annots = this.normalizedEntries().Annots;
      Annots.push(annotRef);
    };
    PDFPageLeaf2.prototype.removeAnnot = function(annotRef) {
      var Annots = this.normalizedEntries().Annots;
      var index = Annots.indexOf(annotRef);
      if (index !== void 0) {
        Annots.remove(index);
      }
    };
    PDFPageLeaf2.prototype.setFontDictionary = function(name, fontDictRef) {
      var Font2 = this.normalizedEntries().Font;
      Font2.set(name, fontDictRef);
    };
    PDFPageLeaf2.prototype.newFontDictionaryKey = function(tag) {
      var Font2 = this.normalizedEntries().Font;
      return Font2.uniqueKey(tag);
    };
    PDFPageLeaf2.prototype.newFontDictionary = function(tag, fontDictRef) {
      var key = this.newFontDictionaryKey(tag);
      this.setFontDictionary(key, fontDictRef);
      return key;
    };
    PDFPageLeaf2.prototype.setXObject = function(name, xObjectRef) {
      var XObject = this.normalizedEntries().XObject;
      XObject.set(name, xObjectRef);
    };
    PDFPageLeaf2.prototype.newXObjectKey = function(tag) {
      var XObject = this.normalizedEntries().XObject;
      return XObject.uniqueKey(tag);
    };
    PDFPageLeaf2.prototype.newXObject = function(tag, xObjectRef) {
      var key = this.newXObjectKey(tag);
      this.setXObject(key, xObjectRef);
      return key;
    };
    PDFPageLeaf2.prototype.setExtGState = function(name, extGStateRef) {
      var ExtGState = this.normalizedEntries().ExtGState;
      ExtGState.set(name, extGStateRef);
    };
    PDFPageLeaf2.prototype.newExtGStateKey = function(tag) {
      var ExtGState = this.normalizedEntries().ExtGState;
      return ExtGState.uniqueKey(tag);
    };
    PDFPageLeaf2.prototype.newExtGState = function(tag, extGStateRef) {
      var key = this.newExtGStateKey(tag);
      this.setExtGState(key, extGStateRef);
      return key;
    };
    PDFPageLeaf2.prototype.ascend = function(visitor) {
      visitor(this);
      var Parent = this.Parent();
      if (Parent)
        Parent.ascend(visitor);
    };
    PDFPageLeaf2.prototype.normalize = function() {
      if (this.normalized)
        return;
      var context = this.context;
      var contentsRef = this.get(PDFName.Contents);
      var contents = this.context.lookup(contentsRef);
      if (contents instanceof PDFStream) {
        this.set(PDFName.Contents, context.obj([contentsRef]));
      }
      if (this.autoNormalizeCTM) {
        this.wrapContentStreams(this.context.getPushGraphicsStateContentStream(), this.context.getPopGraphicsStateContentStream());
      }
      var dictOrRef = this.getInheritableAttribute(PDFName.Resources);
      var Resources = context.lookupMaybe(dictOrRef, PDFDict) || context.obj({});
      this.set(PDFName.Resources, Resources);
      var Font2 = Resources.lookupMaybe(PDFName.Font, PDFDict) || context.obj({});
      Resources.set(PDFName.Font, Font2);
      var XObject = Resources.lookupMaybe(PDFName.XObject, PDFDict) || context.obj({});
      Resources.set(PDFName.XObject, XObject);
      var ExtGState = Resources.lookupMaybe(PDFName.ExtGState, PDFDict) || context.obj({});
      Resources.set(PDFName.ExtGState, ExtGState);
      var Annots = this.Annots() || context.obj([]);
      this.set(PDFName.Annots, Annots);
      this.normalized = true;
    };
    PDFPageLeaf2.prototype.normalizedEntries = function() {
      this.normalize();
      var Annots = this.Annots();
      var Resources = this.Resources();
      var Contents = this.Contents();
      return {
        Annots,
        Resources,
        Contents,
        Font: Resources.lookup(PDFName.Font, PDFDict),
        XObject: Resources.lookup(PDFName.XObject, PDFDict),
        ExtGState: Resources.lookup(PDFName.ExtGState, PDFDict)
      };
    };
    PDFPageLeaf2.InheritableEntries = [
      "Resources",
      "MediaBox",
      "CropBox",
      "Rotate"
    ];
    PDFPageLeaf2.withContextAndParent = function(context, parent) {
      var dict = /* @__PURE__ */ new Map();
      dict.set(PDFName.Type, PDFName.Page);
      dict.set(PDFName.Parent, parent);
      dict.set(PDFName.Resources, context.obj({}));
      dict.set(PDFName.MediaBox, context.obj([0, 0, 612, 792]));
      return new PDFPageLeaf2(dict, context, false);
    };
    PDFPageLeaf2.fromMapWithContext = function(map, context, autoNormalizeCTM) {
      if (autoNormalizeCTM === void 0) {
        autoNormalizeCTM = true;
      }
      return new PDFPageLeaf2(map, context, autoNormalizeCTM);
    };
    return PDFPageLeaf2;
  }(PDFDict)
);
var PDFObjectCopier = (
  /** @class */
  function() {
    function PDFObjectCopier2(src, dest) {
      var _this = this;
      this.traversedObjects = /* @__PURE__ */ new Map();
      this.copy = function(object2) {
        return object2 instanceof PDFPageLeaf ? _this.copyPDFPage(object2) : object2 instanceof PDFDict ? _this.copyPDFDict(object2) : object2 instanceof PDFArray ? _this.copyPDFArray(object2) : object2 instanceof PDFStream ? _this.copyPDFStream(object2) : object2 instanceof PDFRef ? _this.copyPDFIndirectObject(object2) : object2.clone();
      };
      this.copyPDFPage = function(originalPage) {
        var clonedPage = originalPage.clone();
        var InheritableEntries = PDFPageLeaf.InheritableEntries;
        for (var idx = 0, len = InheritableEntries.length; idx < len; idx++) {
          var key = PDFName.of(InheritableEntries[idx]);
          var value = clonedPage.getInheritableAttribute(key);
          if (!clonedPage.get(key) && value)
            clonedPage.set(key, value);
        }
        clonedPage.delete(PDFName.of("Parent"));
        return _this.copyPDFDict(clonedPage);
      };
      this.copyPDFDict = function(originalDict) {
        if (_this.traversedObjects.has(originalDict)) {
          return _this.traversedObjects.get(originalDict);
        }
        var clonedDict = originalDict.clone(_this.dest);
        _this.traversedObjects.set(originalDict, clonedDict);
        var entries = originalDict.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
          var _a2 = entries[idx], key = _a2[0], value = _a2[1];
          clonedDict.set(key, _this.copy(value));
        }
        return clonedDict;
      };
      this.copyPDFArray = function(originalArray) {
        if (_this.traversedObjects.has(originalArray)) {
          return _this.traversedObjects.get(originalArray);
        }
        var clonedArray = originalArray.clone(_this.dest);
        _this.traversedObjects.set(originalArray, clonedArray);
        for (var idx = 0, len = originalArray.size(); idx < len; idx++) {
          var value = originalArray.get(idx);
          clonedArray.set(idx, _this.copy(value));
        }
        return clonedArray;
      };
      this.copyPDFStream = function(originalStream) {
        if (_this.traversedObjects.has(originalStream)) {
          return _this.traversedObjects.get(originalStream);
        }
        var clonedStream = originalStream.clone(_this.dest);
        _this.traversedObjects.set(originalStream, clonedStream);
        var entries = originalStream.dict.entries();
        for (var idx = 0, len = entries.length; idx < len; idx++) {
          var _a2 = entries[idx], key = _a2[0], value = _a2[1];
          clonedStream.dict.set(key, _this.copy(value));
        }
        return clonedStream;
      };
      this.copyPDFIndirectObject = function(ref) {
        var alreadyMapped = _this.traversedObjects.has(ref);
        if (!alreadyMapped) {
          var newRef = _this.dest.nextRef();
          _this.traversedObjects.set(ref, newRef);
          var dereferencedValue = _this.src.lookup(ref);
          if (dereferencedValue) {
            var cloned = _this.copy(dereferencedValue);
            _this.dest.assign(newRef, cloned);
          }
        }
        return _this.traversedObjects.get(ref);
      };
      this.src = src;
      this.dest = dest;
    }
    PDFObjectCopier2.for = function(src, dest) {
      return new PDFObjectCopier2(src, dest);
    };
    return PDFObjectCopier2;
  }()
);
var PDFCrossRefSection = (
  /** @class */
  function() {
    function PDFCrossRefSection2(firstEntry) {
      this.subsections = firstEntry ? [[firstEntry]] : [];
      this.chunkIdx = 0;
      this.chunkLength = firstEntry ? 1 : 0;
    }
    PDFCrossRefSection2.prototype.addEntry = function(ref, offset) {
      this.append({ ref, offset, deleted: false });
    };
    PDFCrossRefSection2.prototype.addDeletedEntry = function(ref, nextFreeObjectNumber) {
      this.append({ ref, offset: nextFreeObjectNumber, deleted: true });
    };
    PDFCrossRefSection2.prototype.toString = function() {
      var section = "xref\n";
      for (var rangeIdx = 0, rangeLen = this.subsections.length; rangeIdx < rangeLen; rangeIdx++) {
        var range2 = this.subsections[rangeIdx];
        section += range2[0].ref.objectNumber + " " + range2.length + "\n";
        for (var entryIdx = 0, entryLen = range2.length; entryIdx < entryLen; entryIdx++) {
          var entry = range2[entryIdx];
          section += padStart(String(entry.offset), 10, "0");
          section += " ";
          section += padStart(String(entry.ref.generationNumber), 5, "0");
          section += " ";
          section += entry.deleted ? "f" : "n";
          section += " \n";
        }
      }
      return section;
    };
    PDFCrossRefSection2.prototype.sizeInBytes = function() {
      var size = 5;
      for (var idx = 0, len = this.subsections.length; idx < len; idx++) {
        var subsection = this.subsections[idx];
        var subsectionLength = subsection.length;
        var firstEntry = subsection[0];
        size += 2;
        size += String(firstEntry.ref.objectNumber).length;
        size += String(subsectionLength).length;
        size += 20 * subsectionLength;
      }
      return size;
    };
    PDFCrossRefSection2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes$1.x;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.e;
      buffer[offset++] = CharCodes$1.f;
      buffer[offset++] = CharCodes$1.Newline;
      offset += this.copySubsectionsIntoBuffer(this.subsections, buffer, offset);
      return offset - initialOffset;
    };
    PDFCrossRefSection2.prototype.copySubsectionsIntoBuffer = function(subsections, buffer, offset) {
      var initialOffset = offset;
      var length = subsections.length;
      for (var idx = 0; idx < length; idx++) {
        var subsection = this.subsections[idx];
        var firstObjectNumber = String(subsection[0].ref.objectNumber);
        offset += copyStringIntoBuffer(firstObjectNumber, buffer, offset);
        buffer[offset++] = CharCodes$1.Space;
        var rangeLength = String(subsection.length);
        offset += copyStringIntoBuffer(rangeLength, buffer, offset);
        buffer[offset++] = CharCodes$1.Newline;
        offset += this.copyEntriesIntoBuffer(subsection, buffer, offset);
      }
      return offset - initialOffset;
    };
    PDFCrossRefSection2.prototype.copyEntriesIntoBuffer = function(entries, buffer, offset) {
      var length = entries.length;
      for (var idx = 0; idx < length; idx++) {
        var entry = entries[idx];
        var entryOffset = padStart(String(entry.offset), 10, "0");
        offset += copyStringIntoBuffer(entryOffset, buffer, offset);
        buffer[offset++] = CharCodes$1.Space;
        var entryGen = padStart(String(entry.ref.generationNumber), 5, "0");
        offset += copyStringIntoBuffer(entryGen, buffer, offset);
        buffer[offset++] = CharCodes$1.Space;
        buffer[offset++] = entry.deleted ? CharCodes$1.f : CharCodes$1.n;
        buffer[offset++] = CharCodes$1.Space;
        buffer[offset++] = CharCodes$1.Newline;
      }
      return 20 * length;
    };
    PDFCrossRefSection2.prototype.append = function(currEntry) {
      if (this.chunkLength === 0) {
        this.subsections.push([currEntry]);
        this.chunkIdx = 0;
        this.chunkLength = 1;
        return;
      }
      var chunk = this.subsections[this.chunkIdx];
      var prevEntry = chunk[this.chunkLength - 1];
      if (currEntry.ref.objectNumber - prevEntry.ref.objectNumber > 1) {
        this.subsections.push([currEntry]);
        this.chunkIdx += 1;
        this.chunkLength = 1;
      } else {
        chunk.push(currEntry);
        this.chunkLength += 1;
      }
    };
    PDFCrossRefSection2.create = function() {
      return new PDFCrossRefSection2({
        ref: PDFRef.of(0, 65535),
        offset: 0,
        deleted: true
      });
    };
    PDFCrossRefSection2.createEmpty = function() {
      return new PDFCrossRefSection2();
    };
    return PDFCrossRefSection2;
  }()
);
var PDFTrailer = (
  /** @class */
  function() {
    function PDFTrailer2(lastXRefOffset) {
      this.lastXRefOffset = String(lastXRefOffset);
    }
    PDFTrailer2.prototype.toString = function() {
      return "startxref\n" + this.lastXRefOffset + "\n%%EOF";
    };
    PDFTrailer2.prototype.sizeInBytes = function() {
      return 16 + this.lastXRefOffset.length;
    };
    PDFTrailer2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes$1.s;
      buffer[offset++] = CharCodes$1.t;
      buffer[offset++] = CharCodes$1.a;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.t;
      buffer[offset++] = CharCodes$1.x;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.e;
      buffer[offset++] = CharCodes$1.f;
      buffer[offset++] = CharCodes$1.Newline;
      offset += copyStringIntoBuffer(this.lastXRefOffset, buffer, offset);
      buffer[offset++] = CharCodes$1.Newline;
      buffer[offset++] = CharCodes$1.Percent;
      buffer[offset++] = CharCodes$1.Percent;
      buffer[offset++] = CharCodes$1.E;
      buffer[offset++] = CharCodes$1.O;
      buffer[offset++] = CharCodes$1.F;
      return offset - initialOffset;
    };
    PDFTrailer2.forLastCrossRefSectionOffset = function(offset) {
      return new PDFTrailer2(offset);
    };
    return PDFTrailer2;
  }()
);
var PDFTrailerDict = (
  /** @class */
  function() {
    function PDFTrailerDict2(dict) {
      this.dict = dict;
    }
    PDFTrailerDict2.prototype.toString = function() {
      return "trailer\n" + this.dict.toString();
    };
    PDFTrailerDict2.prototype.sizeInBytes = function() {
      return 8 + this.dict.sizeInBytes();
    };
    PDFTrailerDict2.prototype.copyBytesInto = function(buffer, offset) {
      var initialOffset = offset;
      buffer[offset++] = CharCodes$1.t;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.a;
      buffer[offset++] = CharCodes$1.i;
      buffer[offset++] = CharCodes$1.l;
      buffer[offset++] = CharCodes$1.e;
      buffer[offset++] = CharCodes$1.r;
      buffer[offset++] = CharCodes$1.Newline;
      offset += this.dict.copyBytesInto(buffer, offset);
      return offset - initialOffset;
    };
    PDFTrailerDict2.of = function(dict) {
      return new PDFTrailerDict2(dict);
    };
    return PDFTrailerDict2;
  }()
);
var PDFObjectStream = (
  /** @class */
  function(_super) {
    __extends(PDFObjectStream2, _super);
    function PDFObjectStream2(context, objects, encode) {
      if (encode === void 0) {
        encode = true;
      }
      var _this = _super.call(this, context.obj({}), encode) || this;
      _this.objects = objects;
      _this.offsets = _this.computeObjectOffsets();
      _this.offsetsString = _this.computeOffsetsString();
      _this.dict.set(PDFName.of("Type"), PDFName.of("ObjStm"));
      _this.dict.set(PDFName.of("N"), PDFNumber.of(_this.objects.length));
      _this.dict.set(PDFName.of("First"), PDFNumber.of(_this.offsetsString.length));
      return _this;
    }
    PDFObjectStream2.prototype.getObjectsCount = function() {
      return this.objects.length;
    };
    PDFObjectStream2.prototype.clone = function(context) {
      return PDFObjectStream2.withContextAndObjects(context || this.dict.context, this.objects.slice(), this.encode);
    };
    PDFObjectStream2.prototype.getContentsString = function() {
      var value = this.offsetsString;
      for (var idx = 0, len = this.objects.length; idx < len; idx++) {
        var _a2 = this.objects[idx], object2 = _a2[1];
        value += object2 + "\n";
      }
      return value;
    };
    PDFObjectStream2.prototype.getUnencodedContents = function() {
      var buffer = new Uint8Array(this.getUnencodedContentsSize());
      var offset = copyStringIntoBuffer(this.offsetsString, buffer, 0);
      for (var idx = 0, len = this.objects.length; idx < len; idx++) {
        var _a2 = this.objects[idx], object2 = _a2[1];
        offset += object2.copyBytesInto(buffer, offset);
        buffer[offset++] = CharCodes$1.Newline;
      }
      return buffer;
    };
    PDFObjectStream2.prototype.getUnencodedContentsSize = function() {
      return this.offsetsString.length + last(this.offsets)[1] + last(this.objects)[1].sizeInBytes() + 1;
    };
    PDFObjectStream2.prototype.computeOffsetsString = function() {
      var offsetsString = "";
      for (var idx = 0, len = this.offsets.length; idx < len; idx++) {
        var _a2 = this.offsets[idx], objectNumber = _a2[0], offset = _a2[1];
        offsetsString += objectNumber + " " + offset + " ";
      }
      return offsetsString;
    };
    PDFObjectStream2.prototype.computeObjectOffsets = function() {
      var offset = 0;
      var offsets = new Array(this.objects.length);
      for (var idx = 0, len = this.objects.length; idx < len; idx++) {
        var _a2 = this.objects[idx], ref = _a2[0], object2 = _a2[1];
        offsets[idx] = [ref.objectNumber, offset];
        offset += object2.sizeInBytes() + 1;
      }
      return offsets;
    };
    PDFObjectStream2.withContextAndObjects = function(context, objects, encode) {
      if (encode === void 0) {
        encode = true;
      }
      return new PDFObjectStream2(context, objects, encode);
    };
    return PDFObjectStream2;
  }(PDFFlateStream)
);
var PDFWriter = (
  /** @class */
  function() {
    function PDFWriter2(context, objectsPerTick) {
      var _this = this;
      this.parsedObjects = 0;
      this.shouldWaitForTick = function(n) {
        _this.parsedObjects += n;
        return _this.parsedObjects % _this.objectsPerTick === 0;
      };
      this.context = context;
      this.objectsPerTick = objectsPerTick;
    }
    PDFWriter2.prototype.serializeToBuffer = function() {
      return __awaiter(this, void 0, void 0, function() {
        var _a2, size, header, indirectObjects, xref, trailerDict, trailer, offset, buffer, idx, len, _b2, ref, object2, objectNumber, generationNumber, n;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              return [4, this.computeBufferSize()];
            case 1:
              _a2 = _c.sent(), size = _a2.size, header = _a2.header, indirectObjects = _a2.indirectObjects, xref = _a2.xref, trailerDict = _a2.trailerDict, trailer = _a2.trailer;
              offset = 0;
              buffer = new Uint8Array(size);
              offset += header.copyBytesInto(buffer, offset);
              buffer[offset++] = CharCodes$1.Newline;
              buffer[offset++] = CharCodes$1.Newline;
              idx = 0, len = indirectObjects.length;
              _c.label = 2;
            case 2:
              if (!(idx < len)) return [3, 5];
              _b2 = indirectObjects[idx], ref = _b2[0], object2 = _b2[1];
              objectNumber = String(ref.objectNumber);
              offset += copyStringIntoBuffer(objectNumber, buffer, offset);
              buffer[offset++] = CharCodes$1.Space;
              generationNumber = String(ref.generationNumber);
              offset += copyStringIntoBuffer(generationNumber, buffer, offset);
              buffer[offset++] = CharCodes$1.Space;
              buffer[offset++] = CharCodes$1.o;
              buffer[offset++] = CharCodes$1.b;
              buffer[offset++] = CharCodes$1.j;
              buffer[offset++] = CharCodes$1.Newline;
              offset += object2.copyBytesInto(buffer, offset);
              buffer[offset++] = CharCodes$1.Newline;
              buffer[offset++] = CharCodes$1.e;
              buffer[offset++] = CharCodes$1.n;
              buffer[offset++] = CharCodes$1.d;
              buffer[offset++] = CharCodes$1.o;
              buffer[offset++] = CharCodes$1.b;
              buffer[offset++] = CharCodes$1.j;
              buffer[offset++] = CharCodes$1.Newline;
              buffer[offset++] = CharCodes$1.Newline;
              n = object2 instanceof PDFObjectStream ? object2.getObjectsCount() : 1;
              if (!this.shouldWaitForTick(n)) return [3, 4];
              return [4, waitForTick()];
            case 3:
              _c.sent();
              _c.label = 4;
            case 4:
              idx++;
              return [3, 2];
            case 5:
              if (xref) {
                offset += xref.copyBytesInto(buffer, offset);
                buffer[offset++] = CharCodes$1.Newline;
              }
              if (trailerDict) {
                offset += trailerDict.copyBytesInto(buffer, offset);
                buffer[offset++] = CharCodes$1.Newline;
                buffer[offset++] = CharCodes$1.Newline;
              }
              offset += trailer.copyBytesInto(buffer, offset);
              return [2, buffer];
          }
        });
      });
    };
    PDFWriter2.prototype.computeIndirectObjectSize = function(_a2) {
      var ref = _a2[0], object2 = _a2[1];
      var refSize = ref.sizeInBytes() + 3;
      var objectSize = object2.sizeInBytes() + 9;
      return refSize + objectSize;
    };
    PDFWriter2.prototype.createTrailerDict = function() {
      return this.context.obj({
        Size: this.context.largestObjectNumber + 1,
        Root: this.context.trailerInfo.Root,
        Encrypt: this.context.trailerInfo.Encrypt,
        Info: this.context.trailerInfo.Info,
        ID: this.context.trailerInfo.ID
      });
    };
    PDFWriter2.prototype.computeBufferSize = function() {
      return __awaiter(this, void 0, void 0, function() {
        var header, size, xref, indirectObjects, idx, len, indirectObject, ref, xrefOffset, trailerDict, trailer;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              header = PDFHeader.forVersion(1, 7);
              size = header.sizeInBytes() + 2;
              xref = PDFCrossRefSection.create();
              indirectObjects = this.context.enumerateIndirectObjects();
              idx = 0, len = indirectObjects.length;
              _a2.label = 1;
            case 1:
              if (!(idx < len)) return [3, 4];
              indirectObject = indirectObjects[idx];
              ref = indirectObject[0];
              xref.addEntry(ref, size);
              size += this.computeIndirectObjectSize(indirectObject);
              if (!this.shouldWaitForTick(1)) return [3, 3];
              return [4, waitForTick()];
            case 2:
              _a2.sent();
              _a2.label = 3;
            case 3:
              idx++;
              return [3, 1];
            case 4:
              xrefOffset = size;
              size += xref.sizeInBytes() + 1;
              trailerDict = PDFTrailerDict.of(this.createTrailerDict());
              size += trailerDict.sizeInBytes() + 2;
              trailer = PDFTrailer.forLastCrossRefSectionOffset(xrefOffset);
              size += trailer.sizeInBytes();
              return [2, { size, header, indirectObjects, xref, trailerDict, trailer }];
          }
        });
      });
    };
    PDFWriter2.forContext = function(context, objectsPerTick) {
      return new PDFWriter2(context, objectsPerTick);
    };
    return PDFWriter2;
  }()
);
var PDFInvalidObject = (
  /** @class */
  function(_super) {
    __extends(PDFInvalidObject2, _super);
    function PDFInvalidObject2(data) {
      var _this = _super.call(this) || this;
      _this.data = data;
      return _this;
    }
    PDFInvalidObject2.prototype.clone = function() {
      return PDFInvalidObject2.of(this.data.slice());
    };
    PDFInvalidObject2.prototype.toString = function() {
      return "PDFInvalidObject(" + this.data.length + " bytes)";
    };
    PDFInvalidObject2.prototype.sizeInBytes = function() {
      return this.data.length;
    };
    PDFInvalidObject2.prototype.copyBytesInto = function(buffer, offset) {
      var length = this.data.length;
      for (var idx = 0; idx < length; idx++) {
        buffer[offset++] = this.data[idx];
      }
      return length;
    };
    PDFInvalidObject2.of = function(data) {
      return new PDFInvalidObject2(data);
    };
    return PDFInvalidObject2;
  }(PDFObject)
);
var EntryType;
(function(EntryType2) {
  EntryType2[EntryType2["Deleted"] = 0] = "Deleted";
  EntryType2[EntryType2["Uncompressed"] = 1] = "Uncompressed";
  EntryType2[EntryType2["Compressed"] = 2] = "Compressed";
})(EntryType || (EntryType = {}));
var PDFCrossRefStream = (
  /** @class */
  function(_super) {
    __extends(PDFCrossRefStream2, _super);
    function PDFCrossRefStream2(dict, entries, encode) {
      if (encode === void 0) {
        encode = true;
      }
      var _this = _super.call(this, dict, encode) || this;
      _this.computeIndex = function() {
        var subsections = [];
        var subsectionLength = 0;
        for (var idx = 0, len = _this.entries.length; idx < len; idx++) {
          var currEntry = _this.entries[idx];
          var prevEntry = _this.entries[idx - 1];
          if (idx === 0) {
            subsections.push(currEntry.ref.objectNumber);
          } else if (currEntry.ref.objectNumber - prevEntry.ref.objectNumber > 1) {
            subsections.push(subsectionLength);
            subsections.push(currEntry.ref.objectNumber);
            subsectionLength = 0;
          }
          subsectionLength += 1;
        }
        subsections.push(subsectionLength);
        return subsections;
      };
      _this.computeEntryTuples = function() {
        var entryTuples = new Array(_this.entries.length);
        for (var idx = 0, len = _this.entries.length; idx < len; idx++) {
          var entry = _this.entries[idx];
          if (entry.type === EntryType.Deleted) {
            var type = entry.type, nextFreeObjectNumber = entry.nextFreeObjectNumber, ref = entry.ref;
            entryTuples[idx] = [type, nextFreeObjectNumber, ref.generationNumber];
          }
          if (entry.type === EntryType.Uncompressed) {
            var type = entry.type, offset = entry.offset, ref = entry.ref;
            entryTuples[idx] = [type, offset, ref.generationNumber];
          }
          if (entry.type === EntryType.Compressed) {
            var type = entry.type, objectStreamRef = entry.objectStreamRef, index = entry.index;
            entryTuples[idx] = [type, objectStreamRef.objectNumber, index];
          }
        }
        return entryTuples;
      };
      _this.computeMaxEntryByteWidths = function() {
        var entryTuples = _this.entryTuplesCache.access();
        var widths = [0, 0, 0];
        for (var idx = 0, len = entryTuples.length; idx < len; idx++) {
          var _a2 = entryTuples[idx], first = _a2[0], second = _a2[1], third = _a2[2];
          var firstSize = sizeInBytes(first);
          var secondSize = sizeInBytes(second);
          var thirdSize = sizeInBytes(third);
          if (firstSize > widths[0])
            widths[0] = firstSize;
          if (secondSize > widths[1])
            widths[1] = secondSize;
          if (thirdSize > widths[2])
            widths[2] = thirdSize;
        }
        return widths;
      };
      _this.entries = entries || [];
      _this.entryTuplesCache = Cache.populatedBy(_this.computeEntryTuples);
      _this.maxByteWidthsCache = Cache.populatedBy(_this.computeMaxEntryByteWidths);
      _this.indexCache = Cache.populatedBy(_this.computeIndex);
      dict.set(PDFName.of("Type"), PDFName.of("XRef"));
      return _this;
    }
    PDFCrossRefStream2.prototype.addDeletedEntry = function(ref, nextFreeObjectNumber) {
      var type = EntryType.Deleted;
      this.entries.push({ type, ref, nextFreeObjectNumber });
      this.entryTuplesCache.invalidate();
      this.maxByteWidthsCache.invalidate();
      this.indexCache.invalidate();
      this.contentsCache.invalidate();
    };
    PDFCrossRefStream2.prototype.addUncompressedEntry = function(ref, offset) {
      var type = EntryType.Uncompressed;
      this.entries.push({ type, ref, offset });
      this.entryTuplesCache.invalidate();
      this.maxByteWidthsCache.invalidate();
      this.indexCache.invalidate();
      this.contentsCache.invalidate();
    };
    PDFCrossRefStream2.prototype.addCompressedEntry = function(ref, objectStreamRef, index) {
      var type = EntryType.Compressed;
      this.entries.push({ type, ref, objectStreamRef, index });
      this.entryTuplesCache.invalidate();
      this.maxByteWidthsCache.invalidate();
      this.indexCache.invalidate();
      this.contentsCache.invalidate();
    };
    PDFCrossRefStream2.prototype.clone = function(context) {
      var _a2 = this, dict = _a2.dict, entries = _a2.entries, encode = _a2.encode;
      return PDFCrossRefStream2.of(dict.clone(context), entries.slice(), encode);
    };
    PDFCrossRefStream2.prototype.getContentsString = function() {
      var entryTuples = this.entryTuplesCache.access();
      var byteWidths = this.maxByteWidthsCache.access();
      var value = "";
      for (var entryIdx = 0, entriesLen = entryTuples.length; entryIdx < entriesLen; entryIdx++) {
        var _a2 = entryTuples[entryIdx], first = _a2[0], second = _a2[1], third = _a2[2];
        var firstBytes = reverseArray(bytesFor(first));
        var secondBytes = reverseArray(bytesFor(second));
        var thirdBytes = reverseArray(bytesFor(third));
        for (var idx = byteWidths[0] - 1; idx >= 0; idx--) {
          value += (firstBytes[idx] || 0).toString(2);
        }
        for (var idx = byteWidths[1] - 1; idx >= 0; idx--) {
          value += (secondBytes[idx] || 0).toString(2);
        }
        for (var idx = byteWidths[2] - 1; idx >= 0; idx--) {
          value += (thirdBytes[idx] || 0).toString(2);
        }
      }
      return value;
    };
    PDFCrossRefStream2.prototype.getUnencodedContents = function() {
      var entryTuples = this.entryTuplesCache.access();
      var byteWidths = this.maxByteWidthsCache.access();
      var buffer = new Uint8Array(this.getUnencodedContentsSize());
      var offset = 0;
      for (var entryIdx = 0, entriesLen = entryTuples.length; entryIdx < entriesLen; entryIdx++) {
        var _a2 = entryTuples[entryIdx], first = _a2[0], second = _a2[1], third = _a2[2];
        var firstBytes = reverseArray(bytesFor(first));
        var secondBytes = reverseArray(bytesFor(second));
        var thirdBytes = reverseArray(bytesFor(third));
        for (var idx = byteWidths[0] - 1; idx >= 0; idx--) {
          buffer[offset++] = firstBytes[idx] || 0;
        }
        for (var idx = byteWidths[1] - 1; idx >= 0; idx--) {
          buffer[offset++] = secondBytes[idx] || 0;
        }
        for (var idx = byteWidths[2] - 1; idx >= 0; idx--) {
          buffer[offset++] = thirdBytes[idx] || 0;
        }
      }
      return buffer;
    };
    PDFCrossRefStream2.prototype.getUnencodedContentsSize = function() {
      var byteWidths = this.maxByteWidthsCache.access();
      var entryWidth = sum(byteWidths);
      return entryWidth * this.entries.length;
    };
    PDFCrossRefStream2.prototype.updateDict = function() {
      _super.prototype.updateDict.call(this);
      var byteWidths = this.maxByteWidthsCache.access();
      var index = this.indexCache.access();
      var context = this.dict.context;
      this.dict.set(PDFName.of("W"), context.obj(byteWidths));
      this.dict.set(PDFName.of("Index"), context.obj(index));
    };
    PDFCrossRefStream2.create = function(dict, encode) {
      if (encode === void 0) {
        encode = true;
      }
      var stream2 = new PDFCrossRefStream2(dict, [], encode);
      stream2.addDeletedEntry(PDFRef.of(0, 65535), 0);
      return stream2;
    };
    PDFCrossRefStream2.of = function(dict, entries, encode) {
      if (encode === void 0) {
        encode = true;
      }
      return new PDFCrossRefStream2(dict, entries, encode);
    };
    return PDFCrossRefStream2;
  }(PDFFlateStream)
);
var PDFStreamWriter = (
  /** @class */
  function(_super) {
    __extends(PDFStreamWriter2, _super);
    function PDFStreamWriter2(context, objectsPerTick, encodeStreams, objectsPerStream) {
      var _this = _super.call(this, context, objectsPerTick) || this;
      _this.encodeStreams = encodeStreams;
      _this.objectsPerStream = objectsPerStream;
      return _this;
    }
    PDFStreamWriter2.prototype.computeBufferSize = function() {
      return __awaiter(this, void 0, void 0, function() {
        var objectNumber, header, size, xrefStream, uncompressedObjects, compressedObjects, objectStreamRefs, indirectObjects, idx, len, indirectObject, ref, object2, shouldNotCompress, chunk, objectStreamRef, idx, len, chunk, ref, objectStream, xrefStreamRef, xrefOffset, trailer;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              objectNumber = this.context.largestObjectNumber + 1;
              header = PDFHeader.forVersion(1, 7);
              size = header.sizeInBytes() + 2;
              xrefStream = PDFCrossRefStream.create(this.createTrailerDict(), this.encodeStreams);
              uncompressedObjects = [];
              compressedObjects = [];
              objectStreamRefs = [];
              indirectObjects = this.context.enumerateIndirectObjects();
              idx = 0, len = indirectObjects.length;
              _a2.label = 1;
            case 1:
              if (!(idx < len)) return [3, 6];
              indirectObject = indirectObjects[idx];
              ref = indirectObject[0], object2 = indirectObject[1];
              shouldNotCompress = ref === this.context.trailerInfo.Encrypt || object2 instanceof PDFStream || object2 instanceof PDFInvalidObject || ref.generationNumber !== 0;
              if (!shouldNotCompress) return [3, 4];
              uncompressedObjects.push(indirectObject);
              xrefStream.addUncompressedEntry(ref, size);
              size += this.computeIndirectObjectSize(indirectObject);
              if (!this.shouldWaitForTick(1)) return [3, 3];
              return [4, waitForTick()];
            case 2:
              _a2.sent();
              _a2.label = 3;
            case 3:
              return [3, 5];
            case 4:
              chunk = last(compressedObjects);
              objectStreamRef = last(objectStreamRefs);
              if (!chunk || chunk.length % this.objectsPerStream === 0) {
                chunk = [];
                compressedObjects.push(chunk);
                objectStreamRef = PDFRef.of(objectNumber++);
                objectStreamRefs.push(objectStreamRef);
              }
              xrefStream.addCompressedEntry(ref, objectStreamRef, chunk.length);
              chunk.push(indirectObject);
              _a2.label = 5;
            case 5:
              idx++;
              return [3, 1];
            case 6:
              idx = 0, len = compressedObjects.length;
              _a2.label = 7;
            case 7:
              if (!(idx < len)) return [3, 10];
              chunk = compressedObjects[idx];
              ref = objectStreamRefs[idx];
              objectStream = PDFObjectStream.withContextAndObjects(this.context, chunk, this.encodeStreams);
              xrefStream.addUncompressedEntry(ref, size);
              size += this.computeIndirectObjectSize([ref, objectStream]);
              uncompressedObjects.push([ref, objectStream]);
              if (!this.shouldWaitForTick(chunk.length)) return [3, 9];
              return [4, waitForTick()];
            case 8:
              _a2.sent();
              _a2.label = 9;
            case 9:
              idx++;
              return [3, 7];
            case 10:
              xrefStreamRef = PDFRef.of(objectNumber++);
              xrefStream.dict.set(PDFName.of("Size"), PDFNumber.of(objectNumber));
              xrefStream.addUncompressedEntry(xrefStreamRef, size);
              xrefOffset = size;
              size += this.computeIndirectObjectSize([xrefStreamRef, xrefStream]);
              uncompressedObjects.push([xrefStreamRef, xrefStream]);
              trailer = PDFTrailer.forLastCrossRefSectionOffset(xrefOffset);
              size += trailer.sizeInBytes();
              return [2, { size, header, indirectObjects: uncompressedObjects, trailer }];
          }
        });
      });
    };
    PDFStreamWriter2.forContext = function(context, objectsPerTick, encodeStreams, objectsPerStream) {
      if (encodeStreams === void 0) {
        encodeStreams = true;
      }
      if (objectsPerStream === void 0) {
        objectsPerStream = 50;
      }
      return new PDFStreamWriter2(context, objectsPerTick, encodeStreams, objectsPerStream);
    };
    return PDFStreamWriter2;
  }(PDFWriter)
);
var PDFHexString = (
  /** @class */
  function(_super) {
    __extends(PDFHexString2, _super);
    function PDFHexString2(value) {
      var _this = _super.call(this) || this;
      _this.value = value;
      return _this;
    }
    PDFHexString2.prototype.asBytes = function() {
      var hex = this.value + (this.value.length % 2 === 1 ? "0" : "");
      var hexLength = hex.length;
      var bytes = new Uint8Array(hex.length / 2);
      var hexOffset = 0;
      var bytesOffset = 0;
      while (hexOffset < hexLength) {
        var byte = parseInt(hex.substring(hexOffset, hexOffset + 2), 16);
        bytes[bytesOffset] = byte;
        hexOffset += 2;
        bytesOffset += 1;
      }
      return bytes;
    };
    PDFHexString2.prototype.decodeText = function() {
      var bytes = this.asBytes();
      if (hasUtf16BOM(bytes))
        return utf16Decode(bytes);
      return pdfDocEncodingDecode(bytes);
    };
    PDFHexString2.prototype.decodeDate = function() {
      var text = this.decodeText();
      var date = parseDate(text);
      if (!date)
        throw new InvalidPDFDateStringError(text);
      return date;
    };
    PDFHexString2.prototype.asString = function() {
      return this.value;
    };
    PDFHexString2.prototype.clone = function() {
      return PDFHexString2.of(this.value);
    };
    PDFHexString2.prototype.toString = function() {
      return "<" + this.value + ">";
    };
    PDFHexString2.prototype.sizeInBytes = function() {
      return this.value.length + 2;
    };
    PDFHexString2.prototype.copyBytesInto = function(buffer, offset) {
      buffer[offset++] = CharCodes$1.LessThan;
      offset += copyStringIntoBuffer(this.value, buffer, offset);
      buffer[offset++] = CharCodes$1.GreaterThan;
      return this.value.length + 2;
    };
    PDFHexString2.of = function(value) {
      return new PDFHexString2(value);
    };
    PDFHexString2.fromText = function(value) {
      var encoded = utf16Encode(value);
      var hex = "";
      for (var idx = 0, len = encoded.length; idx < len; idx++) {
        hex += toHexStringOfMinLength(encoded[idx], 4);
      }
      return new PDFHexString2(hex);
    };
    return PDFHexString2;
  }(PDFObject)
);
var StandardFontEmbedder = (
  /** @class */
  function() {
    function StandardFontEmbedder2(fontName, customName) {
      this.encoding = fontName === FontNames.ZapfDingbats ? Encodings.ZapfDingbats : fontName === FontNames.Symbol ? Encodings.Symbol : Encodings.WinAnsi;
      this.font = Font.load(fontName);
      this.fontName = this.font.FontName;
      this.customName = customName;
    }
    StandardFontEmbedder2.prototype.encodeText = function(text) {
      var glyphs = this.encodeTextAsGlyphs(text);
      var hexCodes = new Array(glyphs.length);
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        hexCodes[idx] = toHexString(glyphs[idx].code);
      }
      return PDFHexString.of(hexCodes.join(""));
    };
    StandardFontEmbedder2.prototype.widthOfTextAtSize = function(text, size) {
      var glyphs = this.encodeTextAsGlyphs(text);
      var totalWidth = 0;
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        var left = glyphs[idx].name;
        var right = (glyphs[idx + 1] || {}).name;
        var kernAmount = this.font.getXAxisKerningForPair(left, right) || 0;
        totalWidth += this.widthOfGlyph(left) + kernAmount;
      }
      var scale2 = size / 1e3;
      return totalWidth * scale2;
    };
    StandardFontEmbedder2.prototype.heightOfFontAtSize = function(size, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.descender, descender = _a2 === void 0 ? true : _a2;
      var _b2 = this.font, Ascender = _b2.Ascender, Descender = _b2.Descender, FontBBox = _b2.FontBBox;
      var yTop = Ascender || FontBBox[3];
      var yBottom = Descender || FontBBox[1];
      var height = yTop - yBottom;
      if (!descender)
        height += Descender || 0;
      return height / 1e3 * size;
    };
    StandardFontEmbedder2.prototype.sizeOfFontAtHeight = function(height) {
      var _a2 = this.font, Ascender = _a2.Ascender, Descender = _a2.Descender, FontBBox = _a2.FontBBox;
      var yTop = Ascender || FontBBox[3];
      var yBottom = Descender || FontBBox[1];
      return 1e3 * height / (yTop - yBottom);
    };
    StandardFontEmbedder2.prototype.embedIntoContext = function(context, ref) {
      var fontDict = context.obj({
        Type: "Font",
        Subtype: "Type1",
        BaseFont: this.customName || this.fontName,
        Encoding: this.encoding === Encodings.WinAnsi ? "WinAnsiEncoding" : void 0
      });
      if (ref) {
        context.assign(ref, fontDict);
        return ref;
      } else {
        return context.register(fontDict);
      }
    };
    StandardFontEmbedder2.prototype.widthOfGlyph = function(glyphName) {
      return this.font.getWidthOfGlyph(glyphName) || 250;
    };
    StandardFontEmbedder2.prototype.encodeTextAsGlyphs = function(text) {
      var codePoints = Array.from(text);
      var glyphs = new Array(codePoints.length);
      for (var idx = 0, len = codePoints.length; idx < len; idx++) {
        var codePoint = toCodePoint(codePoints[idx]);
        glyphs[idx] = this.encoding.encodeUnicodeCodePoint(codePoint);
      }
      return glyphs;
    };
    StandardFontEmbedder2.for = function(fontName, customName) {
      return new StandardFontEmbedder2(fontName, customName);
    };
    return StandardFontEmbedder2;
  }()
);
var createCmap = function(glyphs, glyphId) {
  var bfChars = new Array(glyphs.length);
  for (var idx = 0, len = glyphs.length; idx < len; idx++) {
    var glyph = glyphs[idx];
    var id = cmapHexFormat(cmapHexString(glyphId(glyph)));
    var unicode = cmapHexFormat.apply(void 0, glyph.codePoints.map(cmapCodePointFormat));
    bfChars[idx] = [id, unicode];
  }
  return fillCmapTemplate(bfChars);
};
var fillCmapTemplate = function(bfChars) {
  return "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange\n" + bfChars.length + " beginbfchar\n" + bfChars.map(function(_a2) {
    var glyphId = _a2[0], codePoint = _a2[1];
    return glyphId + " " + codePoint;
  }).join("\n") + "\nendbfchar\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
};
var cmapHexFormat = function() {
  var values2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values2[_i] = arguments[_i];
  }
  return "<" + values2.join("") + ">";
};
var cmapHexString = function(value) {
  return toHexStringOfMinLength(value, 4);
};
var cmapCodePointFormat = function(codePoint) {
  if (isWithinBMP(codePoint))
    return cmapHexString(codePoint);
  if (hasSurrogates(codePoint)) {
    var hs = highSurrogate(codePoint);
    var ls = lowSurrogate(codePoint);
    return "" + cmapHexString(hs) + cmapHexString(ls);
  }
  var hex = toHexString(codePoint);
  var msg = "0x" + hex + " is not a valid UTF-8 or UTF-16 codepoint.";
  throw new Error(msg);
};
var makeFontFlags = function(options) {
  var flags = 0;
  var flipBit = function(bit) {
    flags |= 1 << bit - 1;
  };
  if (options.fixedPitch)
    flipBit(1);
  if (options.serif)
    flipBit(2);
  flipBit(3);
  if (options.script)
    flipBit(4);
  if (options.nonsymbolic)
    flipBit(6);
  if (options.italic)
    flipBit(7);
  if (options.allCap)
    flipBit(17);
  if (options.smallCap)
    flipBit(18);
  if (options.forceBold)
    flipBit(19);
  return flags;
};
var deriveFontFlags = function(font) {
  var familyClass = font["OS/2"] ? font["OS/2"].sFamilyClass : 0;
  var flags = makeFontFlags({
    fixedPitch: font.post.isFixedPitch,
    serif: 1 <= familyClass && familyClass <= 7,
    script: familyClass === 10,
    italic: font.head.macStyle.italic
  });
  return flags;
};
var PDFString = (
  /** @class */
  function(_super) {
    __extends(PDFString2, _super);
    function PDFString2(value) {
      var _this = _super.call(this) || this;
      _this.value = value;
      return _this;
    }
    PDFString2.prototype.asBytes = function() {
      var bytes = [];
      var octal = "";
      var escaped = false;
      var pushByte = function(byte2) {
        if (byte2 !== void 0)
          bytes.push(byte2);
        escaped = false;
      };
      for (var idx = 0, len = this.value.length; idx < len; idx++) {
        var char = this.value[idx];
        var byte = toCharCode(char);
        var nextChar = this.value[idx + 1];
        if (!escaped) {
          if (byte === CharCodes$1.BackSlash)
            escaped = true;
          else
            pushByte(byte);
        } else {
          if (byte === CharCodes$1.Newline)
            pushByte();
          else if (byte === CharCodes$1.CarriageReturn)
            pushByte();
          else if (byte === CharCodes$1.n)
            pushByte(CharCodes$1.Newline);
          else if (byte === CharCodes$1.r)
            pushByte(CharCodes$1.CarriageReturn);
          else if (byte === CharCodes$1.t)
            pushByte(CharCodes$1.Tab);
          else if (byte === CharCodes$1.b)
            pushByte(CharCodes$1.Backspace);
          else if (byte === CharCodes$1.f)
            pushByte(CharCodes$1.FormFeed);
          else if (byte === CharCodes$1.LeftParen)
            pushByte(CharCodes$1.LeftParen);
          else if (byte === CharCodes$1.RightParen)
            pushByte(CharCodes$1.RightParen);
          else if (byte === CharCodes$1.Backspace)
            pushByte(CharCodes$1.BackSlash);
          else if (byte >= CharCodes$1.Zero && byte <= CharCodes$1.Seven) {
            octal += char;
            if (octal.length === 3 || !(nextChar >= "0" && nextChar <= "7")) {
              pushByte(parseInt(octal, 8));
              octal = "";
            }
          } else {
            pushByte(byte);
          }
        }
      }
      return new Uint8Array(bytes);
    };
    PDFString2.prototype.decodeText = function() {
      var bytes = this.asBytes();
      if (hasUtf16BOM(bytes))
        return utf16Decode(bytes);
      return pdfDocEncodingDecode(bytes);
    };
    PDFString2.prototype.decodeDate = function() {
      var text = this.decodeText();
      var date = parseDate(text);
      if (!date)
        throw new InvalidPDFDateStringError(text);
      return date;
    };
    PDFString2.prototype.asString = function() {
      return this.value;
    };
    PDFString2.prototype.clone = function() {
      return PDFString2.of(this.value);
    };
    PDFString2.prototype.toString = function() {
      return "(" + this.value + ")";
    };
    PDFString2.prototype.sizeInBytes = function() {
      return this.value.length + 2;
    };
    PDFString2.prototype.copyBytesInto = function(buffer, offset) {
      buffer[offset++] = CharCodes$1.LeftParen;
      offset += copyStringIntoBuffer(this.value, buffer, offset);
      buffer[offset++] = CharCodes$1.RightParen;
      return this.value.length + 2;
    };
    PDFString2.of = function(value) {
      return new PDFString2(value);
    };
    PDFString2.fromDate = function(date) {
      var year = padStart(String(date.getUTCFullYear()), 4, "0");
      var month = padStart(String(date.getUTCMonth() + 1), 2, "0");
      var day = padStart(String(date.getUTCDate()), 2, "0");
      var hours = padStart(String(date.getUTCHours()), 2, "0");
      var mins = padStart(String(date.getUTCMinutes()), 2, "0");
      var secs = padStart(String(date.getUTCSeconds()), 2, "0");
      return new PDFString2("D:" + year + month + day + hours + mins + secs + "Z");
    };
    return PDFString2;
  }(PDFObject)
);
var CustomFontEmbedder = (
  /** @class */
  function() {
    function CustomFontEmbedder2(font, fontData, customName, fontFeatures) {
      var _this = this;
      this.allGlyphsInFontSortedById = function() {
        var glyphs = new Array(_this.font.characterSet.length);
        for (var idx = 0, len = glyphs.length; idx < len; idx++) {
          var codePoint = _this.font.characterSet[idx];
          glyphs[idx] = _this.font.glyphForCodePoint(codePoint);
        }
        return sortedUniq(glyphs.sort(byAscendingId), function(g) {
          return g.id;
        });
      };
      this.font = font;
      this.scale = 1e3 / this.font.unitsPerEm;
      this.fontData = fontData;
      this.fontName = this.font.postscriptName || "Font";
      this.customName = customName;
      this.fontFeatures = fontFeatures;
      this.baseFontName = "";
      this.glyphCache = Cache.populatedBy(this.allGlyphsInFontSortedById);
    }
    CustomFontEmbedder2.for = function(fontkit, fontData, customName, fontFeatures) {
      return __awaiter(this, void 0, void 0, function() {
        var font;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, fontkit.create(fontData)];
            case 1:
              font = _a2.sent();
              return [2, new CustomFontEmbedder2(font, fontData, customName, fontFeatures)];
          }
        });
      });
    };
    CustomFontEmbedder2.prototype.encodeText = function(text) {
      var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
      var hexCodes = new Array(glyphs.length);
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        hexCodes[idx] = toHexStringOfMinLength(glyphs[idx].id, 4);
      }
      return PDFHexString.of(hexCodes.join(""));
    };
    CustomFontEmbedder2.prototype.widthOfTextAtSize = function(text, size) {
      var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
      var totalWidth = 0;
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        totalWidth += glyphs[idx].advanceWidth * this.scale;
      }
      var scale2 = size / 1e3;
      return totalWidth * scale2;
    };
    CustomFontEmbedder2.prototype.heightOfFontAtSize = function(size, options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.descender, descender = _a2 === void 0 ? true : _a2;
      var _b2 = this.font, ascent = _b2.ascent, descent = _b2.descent, bbox = _b2.bbox;
      var yTop = (ascent || bbox.maxY) * this.scale;
      var yBottom = (descent || bbox.minY) * this.scale;
      var height = yTop - yBottom;
      if (!descender)
        height -= Math.abs(descent) || 0;
      return height / 1e3 * size;
    };
    CustomFontEmbedder2.prototype.sizeOfFontAtHeight = function(height) {
      var _a2 = this.font, ascent = _a2.ascent, descent = _a2.descent, bbox = _a2.bbox;
      var yTop = (ascent || bbox.maxY) * this.scale;
      var yBottom = (descent || bbox.minY) * this.scale;
      return 1e3 * height / (yTop - yBottom);
    };
    CustomFontEmbedder2.prototype.embedIntoContext = function(context, ref) {
      this.baseFontName = this.customName || context.addRandomSuffix(this.fontName);
      return this.embedFontDict(context, ref);
    };
    CustomFontEmbedder2.prototype.embedFontDict = function(context, ref) {
      return __awaiter(this, void 0, void 0, function() {
        var cidFontDictRef, unicodeCMapRef, fontDict;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, this.embedCIDFontDict(context)];
            case 1:
              cidFontDictRef = _a2.sent();
              unicodeCMapRef = this.embedUnicodeCmap(context);
              fontDict = context.obj({
                Type: "Font",
                Subtype: "Type0",
                BaseFont: this.baseFontName,
                Encoding: "Identity-H",
                DescendantFonts: [cidFontDictRef],
                ToUnicode: unicodeCMapRef
              });
              if (ref) {
                context.assign(ref, fontDict);
                return [2, ref];
              } else {
                return [2, context.register(fontDict)];
              }
          }
        });
      });
    };
    CustomFontEmbedder2.prototype.isCFF = function() {
      return this.font.cff;
    };
    CustomFontEmbedder2.prototype.embedCIDFontDict = function(context) {
      return __awaiter(this, void 0, void 0, function() {
        var fontDescriptorRef, cidFontDict;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, this.embedFontDescriptor(context)];
            case 1:
              fontDescriptorRef = _a2.sent();
              cidFontDict = context.obj({
                Type: "Font",
                Subtype: this.isCFF() ? "CIDFontType0" : "CIDFontType2",
                CIDToGIDMap: "Identity",
                BaseFont: this.baseFontName,
                CIDSystemInfo: {
                  Registry: PDFString.of("Adobe"),
                  Ordering: PDFString.of("Identity"),
                  Supplement: 0
                },
                FontDescriptor: fontDescriptorRef,
                W: this.computeWidths()
              });
              return [2, context.register(cidFontDict)];
          }
        });
      });
    };
    CustomFontEmbedder2.prototype.embedFontDescriptor = function(context) {
      return __awaiter(this, void 0, void 0, function() {
        var fontStreamRef, scale2, _a2, italicAngle, ascent, descent, capHeight, xHeight, _b2, minX, minY, maxX, maxY, fontDescriptor;
        var _c;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              return [4, this.embedFontStream(context)];
            case 1:
              fontStreamRef = _d.sent();
              scale2 = this.scale;
              _a2 = this.font, italicAngle = _a2.italicAngle, ascent = _a2.ascent, descent = _a2.descent, capHeight = _a2.capHeight, xHeight = _a2.xHeight;
              _b2 = this.font.bbox, minX = _b2.minX, minY = _b2.minY, maxX = _b2.maxX, maxY = _b2.maxY;
              fontDescriptor = context.obj((_c = {
                Type: "FontDescriptor",
                FontName: this.baseFontName,
                Flags: deriveFontFlags(this.font),
                FontBBox: [minX * scale2, minY * scale2, maxX * scale2, maxY * scale2],
                ItalicAngle: italicAngle,
                Ascent: ascent * scale2,
                Descent: descent * scale2,
                CapHeight: (capHeight || ascent) * scale2,
                XHeight: (xHeight || 0) * scale2,
                // Not sure how to compute/find this, nor is anybody else really:
                // https://stackoverflow.com/questions/35485179/stemv-value-of-the-truetype-font
                StemV: 0
              }, _c[this.isCFF() ? "FontFile3" : "FontFile2"] = fontStreamRef, _c));
              return [2, context.register(fontDescriptor)];
          }
        });
      });
    };
    CustomFontEmbedder2.prototype.serializeFont = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          return [2, this.fontData];
        });
      });
    };
    CustomFontEmbedder2.prototype.embedFontStream = function(context) {
      return __awaiter(this, void 0, void 0, function() {
        var fontStream, _a2, _b2;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              _b2 = (_a2 = context).flateStream;
              return [4, this.serializeFont()];
            case 1:
              fontStream = _b2.apply(_a2, [_c.sent(), {
                Subtype: this.isCFF() ? "CIDFontType0C" : void 0
              }]);
              return [2, context.register(fontStream)];
          }
        });
      });
    };
    CustomFontEmbedder2.prototype.embedUnicodeCmap = function(context) {
      var cmap = createCmap(this.glyphCache.access(), this.glyphId.bind(this));
      var cmapStream = context.flateStream(cmap);
      return context.register(cmapStream);
    };
    CustomFontEmbedder2.prototype.glyphId = function(glyph) {
      return glyph ? glyph.id : -1;
    };
    CustomFontEmbedder2.prototype.computeWidths = function() {
      var glyphs = this.glyphCache.access();
      var widths = [];
      var currSection = [];
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        var currGlyph = glyphs[idx];
        var prevGlyph = glyphs[idx - 1];
        var currGlyphId = this.glyphId(currGlyph);
        var prevGlyphId = this.glyphId(prevGlyph);
        if (idx === 0) {
          widths.push(currGlyphId);
        } else if (currGlyphId - prevGlyphId !== 1) {
          widths.push(currSection);
          widths.push(currGlyphId);
          currSection = [];
        }
        currSection.push(currGlyph.advanceWidth * this.scale);
      }
      widths.push(currSection);
      return widths;
    };
    return CustomFontEmbedder2;
  }()
);
var CustomFontSubsetEmbedder = (
  /** @class */
  function(_super) {
    __extends(CustomFontSubsetEmbedder2, _super);
    function CustomFontSubsetEmbedder2(font, fontData, customFontName, fontFeatures) {
      var _this = _super.call(this, font, fontData, customFontName, fontFeatures) || this;
      _this.subset = _this.font.createSubset();
      _this.glyphs = [];
      _this.glyphCache = Cache.populatedBy(function() {
        return _this.glyphs;
      });
      _this.glyphIdMap = /* @__PURE__ */ new Map();
      return _this;
    }
    CustomFontSubsetEmbedder2.for = function(fontkit, fontData, customFontName, fontFeatures) {
      return __awaiter(this, void 0, void 0, function() {
        var font;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, fontkit.create(fontData)];
            case 1:
              font = _a2.sent();
              return [2, new CustomFontSubsetEmbedder2(font, fontData, customFontName, fontFeatures)];
          }
        });
      });
    };
    CustomFontSubsetEmbedder2.prototype.encodeText = function(text) {
      var glyphs = this.font.layout(text, this.fontFeatures).glyphs;
      var hexCodes = new Array(glyphs.length);
      for (var idx = 0, len = glyphs.length; idx < len; idx++) {
        var glyph = glyphs[idx];
        var subsetGlyphId = this.subset.includeGlyph(glyph);
        this.glyphs[subsetGlyphId - 1] = glyph;
        this.glyphIdMap.set(glyph.id, subsetGlyphId);
        hexCodes[idx] = toHexStringOfMinLength(subsetGlyphId, 4);
      }
      this.glyphCache.invalidate();
      return PDFHexString.of(hexCodes.join(""));
    };
    CustomFontSubsetEmbedder2.prototype.isCFF = function() {
      return this.subset.cff;
    };
    CustomFontSubsetEmbedder2.prototype.glyphId = function(glyph) {
      return glyph ? this.glyphIdMap.get(glyph.id) : -1;
    };
    CustomFontSubsetEmbedder2.prototype.serializeFont = function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var parts = [];
        _this.subset.encodeStream().on("data", function(bytes) {
          return parts.push(bytes);
        }).on("end", function() {
          return resolve(mergeUint8Arrays(parts));
        }).on("error", function(err) {
          return reject(err);
        });
      });
    };
    return CustomFontSubsetEmbedder2;
  }(CustomFontEmbedder)
);
var AFRelationship;
(function(AFRelationship2) {
  AFRelationship2["Source"] = "Source";
  AFRelationship2["Data"] = "Data";
  AFRelationship2["Alternative"] = "Alternative";
  AFRelationship2["Supplement"] = "Supplement";
  AFRelationship2["EncryptedPayload"] = "EncryptedPayload";
  AFRelationship2["FormData"] = "EncryptedPayload";
  AFRelationship2["Schema"] = "Schema";
  AFRelationship2["Unspecified"] = "Unspecified";
})(AFRelationship || (AFRelationship = {}));
var FileEmbedder = (
  /** @class */
  function() {
    function FileEmbedder2(fileData, fileName, options) {
      if (options === void 0) {
        options = {};
      }
      this.fileData = fileData;
      this.fileName = fileName;
      this.options = options;
    }
    FileEmbedder2.for = function(bytes, fileName, options) {
      if (options === void 0) {
        options = {};
      }
      return new FileEmbedder2(bytes, fileName, options);
    };
    FileEmbedder2.prototype.embedIntoContext = function(context, ref) {
      return __awaiter(this, void 0, void 0, function() {
        var _a2, mimeType, description, creationDate, modificationDate, afRelationship, embeddedFileStream, embeddedFileStreamRef, fileSpecDict;
        return __generator(this, function(_b2) {
          _a2 = this.options, mimeType = _a2.mimeType, description = _a2.description, creationDate = _a2.creationDate, modificationDate = _a2.modificationDate, afRelationship = _a2.afRelationship;
          embeddedFileStream = context.flateStream(this.fileData, {
            Type: "EmbeddedFile",
            Subtype: mimeType !== null && mimeType !== void 0 ? mimeType : void 0,
            Params: {
              Size: this.fileData.length,
              CreationDate: creationDate ? PDFString.fromDate(creationDate) : void 0,
              ModDate: modificationDate ? PDFString.fromDate(modificationDate) : void 0
            }
          });
          embeddedFileStreamRef = context.register(embeddedFileStream);
          fileSpecDict = context.obj({
            Type: "Filespec",
            F: PDFString.of(this.fileName),
            UF: PDFHexString.fromText(this.fileName),
            EF: { F: embeddedFileStreamRef },
            Desc: description ? PDFHexString.fromText(description) : void 0,
            AFRelationship: afRelationship !== null && afRelationship !== void 0 ? afRelationship : void 0
          });
          if (ref) {
            context.assign(ref, fileSpecDict);
            return [2, ref];
          } else {
            return [2, context.register(fileSpecDict)];
          }
        });
      });
    };
    return FileEmbedder2;
  }()
);
var MARKERS = [
  65472,
  65473,
  65474,
  65475,
  65477,
  65478,
  65479,
  65480,
  65481,
  65482,
  65483,
  65484,
  65485,
  65486,
  65487
];
var ColorSpace;
(function(ColorSpace2) {
  ColorSpace2["DeviceGray"] = "DeviceGray";
  ColorSpace2["DeviceRGB"] = "DeviceRGB";
  ColorSpace2["DeviceCMYK"] = "DeviceCMYK";
})(ColorSpace || (ColorSpace = {}));
var ChannelToColorSpace = {
  1: ColorSpace.DeviceGray,
  3: ColorSpace.DeviceRGB,
  4: ColorSpace.DeviceCMYK
};
var JpegEmbedder = (
  /** @class */
  function() {
    function JpegEmbedder2(imageData, bitsPerComponent, width, height, colorSpace) {
      this.imageData = imageData;
      this.bitsPerComponent = bitsPerComponent;
      this.width = width;
      this.height = height;
      this.colorSpace = colorSpace;
    }
    JpegEmbedder2.for = function(imageData) {
      return __awaiter(this, void 0, void 0, function() {
        var dataView, soi, pos, marker, bitsPerComponent, height, width, channelByte, channelName, colorSpace;
        return __generator(this, function(_a2) {
          dataView = new DataView(imageData.buffer);
          soi = dataView.getUint16(0);
          if (soi !== 65496)
            throw new Error("SOI not found in JPEG");
          pos = 2;
          while (pos < dataView.byteLength) {
            marker = dataView.getUint16(pos);
            pos += 2;
            if (MARKERS.includes(marker))
              break;
            pos += dataView.getUint16(pos);
          }
          if (!MARKERS.includes(marker))
            throw new Error("Invalid JPEG");
          pos += 2;
          bitsPerComponent = dataView.getUint8(pos++);
          height = dataView.getUint16(pos);
          pos += 2;
          width = dataView.getUint16(pos);
          pos += 2;
          channelByte = dataView.getUint8(pos++);
          channelName = ChannelToColorSpace[channelByte];
          if (!channelName)
            throw new Error("Unknown JPEG channel.");
          colorSpace = channelName;
          return [2, new JpegEmbedder2(imageData, bitsPerComponent, width, height, colorSpace)];
        });
      });
    };
    JpegEmbedder2.prototype.embedIntoContext = function(context, ref) {
      return __awaiter(this, void 0, void 0, function() {
        var xObject;
        return __generator(this, function(_a2) {
          xObject = context.stream(this.imageData, {
            Type: "XObject",
            Subtype: "Image",
            BitsPerComponent: this.bitsPerComponent,
            Width: this.width,
            Height: this.height,
            ColorSpace: this.colorSpace,
            Filter: "DCTDecode",
            // CMYK JPEG streams in PDF are typically stored complemented,
            // with 1 as 'off' and 0 as 'on' (PDF 32000-1:2008, 8.6.4.4).
            //
            // Standalone CMYK JPEG (usually exported by Photoshop) are
            // stored inverse, with 0 as 'off' and 1 as 'on', like RGB.
            //
            // Applying a swap here as a hedge that most bytes passing
            // through this method will benefit from it.
            Decode: this.colorSpace === ColorSpace.DeviceCMYK ? [1, 0, 1, 0, 1, 0, 1, 0] : void 0
          });
          if (ref) {
            context.assign(ref, xObject);
            return [2, ref];
          } else {
            return [2, context.register(xObject)];
          }
        });
      });
    };
    return JpegEmbedder2;
  }()
);
var getImageType = function(ctype) {
  if (ctype === 0)
    return PngType.Greyscale;
  if (ctype === 2)
    return PngType.Truecolour;
  if (ctype === 3)
    return PngType.IndexedColour;
  if (ctype === 4)
    return PngType.GreyscaleWithAlpha;
  if (ctype === 6)
    return PngType.TruecolourWithAlpha;
  throw new Error("Unknown color type: " + ctype);
};
var splitAlphaChannel = function(rgbaChannel) {
  var pixelCount = Math.floor(rgbaChannel.length / 4);
  var rgbChannel = new Uint8Array(pixelCount * 3);
  var alphaChannel = new Uint8Array(pixelCount * 1);
  var rgbaOffset = 0;
  var rgbOffset = 0;
  var alphaOffset = 0;
  while (rgbaOffset < rgbaChannel.length) {
    rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
    rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
    rgbChannel[rgbOffset++] = rgbaChannel[rgbaOffset++];
    alphaChannel[alphaOffset++] = rgbaChannel[rgbaOffset++];
  }
  return { rgbChannel, alphaChannel };
};
var PngType;
(function(PngType2) {
  PngType2["Greyscale"] = "Greyscale";
  PngType2["Truecolour"] = "Truecolour";
  PngType2["IndexedColour"] = "IndexedColour";
  PngType2["GreyscaleWithAlpha"] = "GreyscaleWithAlpha";
  PngType2["TruecolourWithAlpha"] = "TruecolourWithAlpha";
})(PngType || (PngType = {}));
var PNG = (
  /** @class */
  function() {
    function PNG2(pngData) {
      var upng = UPNG.decode(pngData);
      var frames = UPNG.toRGBA8(upng);
      if (frames.length > 1)
        throw new Error("Animated PNGs are not supported");
      var frame = new Uint8Array(frames[0]);
      var _a2 = splitAlphaChannel(frame), rgbChannel = _a2.rgbChannel, alphaChannel = _a2.alphaChannel;
      this.rgbChannel = rgbChannel;
      var hasAlphaValues = alphaChannel.some(function(a) {
        return a < 255;
      });
      if (hasAlphaValues)
        this.alphaChannel = alphaChannel;
      this.type = getImageType(upng.ctype);
      this.width = upng.width;
      this.height = upng.height;
      this.bitsPerComponent = 8;
    }
    PNG2.load = function(pngData) {
      return new PNG2(pngData);
    };
    return PNG2;
  }()
);
var PngEmbedder = (
  /** @class */
  function() {
    function PngEmbedder2(png) {
      this.image = png;
      this.bitsPerComponent = png.bitsPerComponent;
      this.width = png.width;
      this.height = png.height;
      this.colorSpace = "DeviceRGB";
    }
    PngEmbedder2.for = function(imageData) {
      return __awaiter(this, void 0, void 0, function() {
        var png;
        return __generator(this, function(_a2) {
          png = PNG.load(imageData);
          return [2, new PngEmbedder2(png)];
        });
      });
    };
    PngEmbedder2.prototype.embedIntoContext = function(context, ref) {
      return __awaiter(this, void 0, void 0, function() {
        var SMask, xObject;
        return __generator(this, function(_a2) {
          SMask = this.embedAlphaChannel(context);
          xObject = context.flateStream(this.image.rgbChannel, {
            Type: "XObject",
            Subtype: "Image",
            BitsPerComponent: this.image.bitsPerComponent,
            Width: this.image.width,
            Height: this.image.height,
            ColorSpace: this.colorSpace,
            SMask
          });
          if (ref) {
            context.assign(ref, xObject);
            return [2, ref];
          } else {
            return [2, context.register(xObject)];
          }
        });
      });
    };
    PngEmbedder2.prototype.embedAlphaChannel = function(context) {
      if (!this.image.alphaChannel)
        return void 0;
      var xObject = context.flateStream(this.image.alphaChannel, {
        Type: "XObject",
        Subtype: "Image",
        Height: this.image.height,
        Width: this.image.width,
        BitsPerComponent: this.image.bitsPerComponent,
        ColorSpace: "DeviceGray",
        Decode: [0, 1]
      });
      return context.register(xObject);
    };
    return PngEmbedder2;
  }()
);
var Stream = (
  /** @class */
  function() {
    function Stream2(buffer, start, length) {
      this.bytes = buffer;
      this.start = start || 0;
      this.pos = this.start;
      this.end = !!start && !!length ? start + length : this.bytes.length;
    }
    Object.defineProperty(Stream2.prototype, "length", {
      get: function() {
        return this.end - this.start;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Stream2.prototype, "isEmpty", {
      get: function() {
        return this.length === 0;
      },
      enumerable: false,
      configurable: true
    });
    Stream2.prototype.getByte = function() {
      if (this.pos >= this.end) {
        return -1;
      }
      return this.bytes[this.pos++];
    };
    Stream2.prototype.getUint16 = function() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      if (b0 === -1 || b1 === -1) {
        return -1;
      }
      return (b0 << 8) + b1;
    };
    Stream2.prototype.getInt32 = function() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      var b2 = this.getByte();
      var b3 = this.getByte();
      return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
    };
    Stream2.prototype.getBytes = function(length, forceClamped) {
      if (forceClamped === void 0) {
        forceClamped = false;
      }
      var bytes = this.bytes;
      var pos = this.pos;
      var strEnd = this.end;
      if (!length) {
        var subarray = bytes.subarray(pos, strEnd);
        return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
      } else {
        var end = pos + length;
        if (end > strEnd) {
          end = strEnd;
        }
        this.pos = end;
        var subarray = bytes.subarray(pos, end);
        return forceClamped ? new Uint8ClampedArray(subarray) : subarray;
      }
    };
    Stream2.prototype.peekByte = function() {
      var peekedByte = this.getByte();
      this.pos--;
      return peekedByte;
    };
    Stream2.prototype.peekBytes = function(length, forceClamped) {
      if (forceClamped === void 0) {
        forceClamped = false;
      }
      var bytes = this.getBytes(length, forceClamped);
      this.pos -= bytes.length;
      return bytes;
    };
    Stream2.prototype.skip = function(n) {
      if (!n) {
        n = 1;
      }
      this.pos += n;
    };
    Stream2.prototype.reset = function() {
      this.pos = this.start;
    };
    Stream2.prototype.moveStart = function() {
      this.start = this.pos;
    };
    Stream2.prototype.makeSubStream = function(start, length) {
      return new Stream2(this.bytes, start, length);
    };
    Stream2.prototype.decode = function() {
      return this.bytes;
    };
    return Stream2;
  }()
);
var emptyBuffer = new Uint8Array(0);
var DecodeStream = (
  /** @class */
  function() {
    function DecodeStream2(maybeMinBufferLength) {
      this.pos = 0;
      this.bufferLength = 0;
      this.eof = false;
      this.buffer = emptyBuffer;
      this.minBufferLength = 512;
      if (maybeMinBufferLength) {
        while (this.minBufferLength < maybeMinBufferLength) {
          this.minBufferLength *= 2;
        }
      }
    }
    Object.defineProperty(DecodeStream2.prototype, "isEmpty", {
      get: function() {
        while (!this.eof && this.bufferLength === 0) {
          this.readBlock();
        }
        return this.bufferLength === 0;
      },
      enumerable: false,
      configurable: true
    });
    DecodeStream2.prototype.getByte = function() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof) {
          return -1;
        }
        this.readBlock();
      }
      return this.buffer[this.pos++];
    };
    DecodeStream2.prototype.getUint16 = function() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      if (b0 === -1 || b1 === -1) {
        return -1;
      }
      return (b0 << 8) + b1;
    };
    DecodeStream2.prototype.getInt32 = function() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      var b2 = this.getByte();
      var b3 = this.getByte();
      return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
    };
    DecodeStream2.prototype.getBytes = function(length, forceClamped) {
      if (forceClamped === void 0) {
        forceClamped = false;
      }
      var end;
      var pos = this.pos;
      if (length) {
        this.ensureBuffer(pos + length);
        end = pos + length;
        while (!this.eof && this.bufferLength < end) {
          this.readBlock();
        }
        var bufEnd = this.bufferLength;
        if (end > bufEnd) {
          end = bufEnd;
        }
      } else {
        while (!this.eof) {
          this.readBlock();
        }
        end = this.bufferLength;
      }
      this.pos = end;
      var subarray = this.buffer.subarray(pos, end);
      return forceClamped && !(subarray instanceof Uint8ClampedArray) ? new Uint8ClampedArray(subarray) : subarray;
    };
    DecodeStream2.prototype.peekByte = function() {
      var peekedByte = this.getByte();
      this.pos--;
      return peekedByte;
    };
    DecodeStream2.prototype.peekBytes = function(length, forceClamped) {
      if (forceClamped === void 0) {
        forceClamped = false;
      }
      var bytes = this.getBytes(length, forceClamped);
      this.pos -= bytes.length;
      return bytes;
    };
    DecodeStream2.prototype.skip = function(n) {
      if (!n) {
        n = 1;
      }
      this.pos += n;
    };
    DecodeStream2.prototype.reset = function() {
      this.pos = 0;
    };
    DecodeStream2.prototype.makeSubStream = function(start, length) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof) {
        this.readBlock();
      }
      return new Stream(
        this.buffer,
        start,
        length
        /* dict */
      );
    };
    DecodeStream2.prototype.decode = function() {
      while (!this.eof)
        this.readBlock();
      return this.buffer.subarray(0, this.bufferLength);
    };
    DecodeStream2.prototype.readBlock = function() {
      throw new MethodNotImplementedError(this.constructor.name, "readBlock");
    };
    DecodeStream2.prototype.ensureBuffer = function(requested) {
      var buffer = this.buffer;
      if (requested <= buffer.byteLength) {
        return buffer;
      }
      var size = this.minBufferLength;
      while (size < requested) {
        size *= 2;
      }
      var buffer2 = new Uint8Array(size);
      buffer2.set(buffer);
      return this.buffer = buffer2;
    };
    return DecodeStream2;
  }()
);
var isSpace = function(ch) {
  return ch === 32 || ch === 9 || ch === 13 || ch === 10;
};
var Ascii85Stream = (
  /** @class */
  function(_super) {
    __extends(Ascii85Stream2, _super);
    function Ascii85Stream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
      _this.input = new Uint8Array(5);
      if (maybeLength) {
        maybeLength = 0.8 * maybeLength;
      }
      return _this;
    }
    Ascii85Stream2.prototype.readBlock = function() {
      var TILDA_CHAR = 126;
      var Z_LOWER_CHAR = 122;
      var EOF = -1;
      var stream2 = this.stream;
      var c = stream2.getByte();
      while (isSpace(c)) {
        c = stream2.getByte();
      }
      if (c === EOF || c === TILDA_CHAR) {
        this.eof = true;
        return;
      }
      var bufferLength = this.bufferLength;
      var buffer;
      var i;
      if (c === Z_LOWER_CHAR) {
        buffer = this.ensureBuffer(bufferLength + 4);
        for (i = 0; i < 4; ++i) {
          buffer[bufferLength + i] = 0;
        }
        this.bufferLength += 4;
      } else {
        var input = this.input;
        input[0] = c;
        for (i = 1; i < 5; ++i) {
          c = stream2.getByte();
          while (isSpace(c)) {
            c = stream2.getByte();
          }
          input[i] = c;
          if (c === EOF || c === TILDA_CHAR) {
            break;
          }
        }
        buffer = this.ensureBuffer(bufferLength + i - 1);
        this.bufferLength += i - 1;
        if (i < 5) {
          for (; i < 5; ++i) {
            input[i] = 33 + 84;
          }
          this.eof = true;
        }
        var t = 0;
        for (i = 0; i < 5; ++i) {
          t = t * 85 + (input[i] - 33);
        }
        for (i = 3; i >= 0; --i) {
          buffer[bufferLength + i] = t & 255;
          t >>= 8;
        }
      }
    };
    return Ascii85Stream2;
  }(DecodeStream)
);
var AsciiHexStream = (
  /** @class */
  function(_super) {
    __extends(AsciiHexStream2, _super);
    function AsciiHexStream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
      _this.firstDigit = -1;
      if (maybeLength) {
        maybeLength = 0.5 * maybeLength;
      }
      return _this;
    }
    AsciiHexStream2.prototype.readBlock = function() {
      var UPSTREAM_BLOCK_SIZE = 8e3;
      var bytes = this.stream.getBytes(UPSTREAM_BLOCK_SIZE);
      if (!bytes.length) {
        this.eof = true;
        return;
      }
      var maxDecodeLength = bytes.length + 1 >> 1;
      var buffer = this.ensureBuffer(this.bufferLength + maxDecodeLength);
      var bufferLength = this.bufferLength;
      var firstDigit = this.firstDigit;
      for (var i = 0, ii = bytes.length; i < ii; i++) {
        var ch = bytes[i];
        var digit = void 0;
        if (ch >= 48 && ch <= 57) {
          digit = ch & 15;
        } else if (ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102) {
          digit = (ch & 15) + 9;
        } else if (ch === 62) {
          this.eof = true;
          break;
        } else {
          continue;
        }
        if (firstDigit < 0) {
          firstDigit = digit;
        } else {
          buffer[bufferLength++] = firstDigit << 4 | digit;
          firstDigit = -1;
        }
      }
      if (firstDigit >= 0 && this.eof) {
        buffer[bufferLength++] = firstDigit << 4;
        firstDigit = -1;
      }
      this.firstDigit = firstDigit;
      this.bufferLength = bufferLength;
    };
    return AsciiHexStream2;
  }(DecodeStream)
);
var codeLenCodeMap = new Int32Array([
  16,
  17,
  18,
  0,
  8,
  7,
  9,
  6,
  10,
  5,
  11,
  4,
  12,
  3,
  13,
  2,
  14,
  1,
  15
]);
var lengthDecode = new Int32Array([
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  65547,
  65549,
  65551,
  65553,
  131091,
  131095,
  131099,
  131103,
  196643,
  196651,
  196659,
  196667,
  262211,
  262227,
  262243,
  262259,
  327811,
  327843,
  327875,
  327907,
  258,
  258,
  258
]);
var distDecode = new Int32Array([
  1,
  2,
  3,
  4,
  65541,
  65543,
  131081,
  131085,
  196625,
  196633,
  262177,
  262193,
  327745,
  327777,
  393345,
  393409,
  459009,
  459137,
  524801,
  525057,
  590849,
  591361,
  657409,
  658433,
  724993,
  727041,
  794625,
  798721,
  868353,
  876545
]);
var fixedLitCodeTab = [new Int32Array([
  459008,
  524368,
  524304,
  524568,
  459024,
  524400,
  524336,
  590016,
  459016,
  524384,
  524320,
  589984,
  524288,
  524416,
  524352,
  590048,
  459012,
  524376,
  524312,
  589968,
  459028,
  524408,
  524344,
  590032,
  459020,
  524392,
  524328,
  59e4,
  524296,
  524424,
  524360,
  590064,
  459010,
  524372,
  524308,
  524572,
  459026,
  524404,
  524340,
  590024,
  459018,
  524388,
  524324,
  589992,
  524292,
  524420,
  524356,
  590056,
  459014,
  524380,
  524316,
  589976,
  459030,
  524412,
  524348,
  590040,
  459022,
  524396,
  524332,
  590008,
  524300,
  524428,
  524364,
  590072,
  459009,
  524370,
  524306,
  524570,
  459025,
  524402,
  524338,
  590020,
  459017,
  524386,
  524322,
  589988,
  524290,
  524418,
  524354,
  590052,
  459013,
  524378,
  524314,
  589972,
  459029,
  524410,
  524346,
  590036,
  459021,
  524394,
  524330,
  590004,
  524298,
  524426,
  524362,
  590068,
  459011,
  524374,
  524310,
  524574,
  459027,
  524406,
  524342,
  590028,
  459019,
  524390,
  524326,
  589996,
  524294,
  524422,
  524358,
  590060,
  459015,
  524382,
  524318,
  589980,
  459031,
  524414,
  524350,
  590044,
  459023,
  524398,
  524334,
  590012,
  524302,
  524430,
  524366,
  590076,
  459008,
  524369,
  524305,
  524569,
  459024,
  524401,
  524337,
  590018,
  459016,
  524385,
  524321,
  589986,
  524289,
  524417,
  524353,
  590050,
  459012,
  524377,
  524313,
  589970,
  459028,
  524409,
  524345,
  590034,
  459020,
  524393,
  524329,
  590002,
  524297,
  524425,
  524361,
  590066,
  459010,
  524373,
  524309,
  524573,
  459026,
  524405,
  524341,
  590026,
  459018,
  524389,
  524325,
  589994,
  524293,
  524421,
  524357,
  590058,
  459014,
  524381,
  524317,
  589978,
  459030,
  524413,
  524349,
  590042,
  459022,
  524397,
  524333,
  590010,
  524301,
  524429,
  524365,
  590074,
  459009,
  524371,
  524307,
  524571,
  459025,
  524403,
  524339,
  590022,
  459017,
  524387,
  524323,
  589990,
  524291,
  524419,
  524355,
  590054,
  459013,
  524379,
  524315,
  589974,
  459029,
  524411,
  524347,
  590038,
  459021,
  524395,
  524331,
  590006,
  524299,
  524427,
  524363,
  590070,
  459011,
  524375,
  524311,
  524575,
  459027,
  524407,
  524343,
  590030,
  459019,
  524391,
  524327,
  589998,
  524295,
  524423,
  524359,
  590062,
  459015,
  524383,
  524319,
  589982,
  459031,
  524415,
  524351,
  590046,
  459023,
  524399,
  524335,
  590014,
  524303,
  524431,
  524367,
  590078,
  459008,
  524368,
  524304,
  524568,
  459024,
  524400,
  524336,
  590017,
  459016,
  524384,
  524320,
  589985,
  524288,
  524416,
  524352,
  590049,
  459012,
  524376,
  524312,
  589969,
  459028,
  524408,
  524344,
  590033,
  459020,
  524392,
  524328,
  590001,
  524296,
  524424,
  524360,
  590065,
  459010,
  524372,
  524308,
  524572,
  459026,
  524404,
  524340,
  590025,
  459018,
  524388,
  524324,
  589993,
  524292,
  524420,
  524356,
  590057,
  459014,
  524380,
  524316,
  589977,
  459030,
  524412,
  524348,
  590041,
  459022,
  524396,
  524332,
  590009,
  524300,
  524428,
  524364,
  590073,
  459009,
  524370,
  524306,
  524570,
  459025,
  524402,
  524338,
  590021,
  459017,
  524386,
  524322,
  589989,
  524290,
  524418,
  524354,
  590053,
  459013,
  524378,
  524314,
  589973,
  459029,
  524410,
  524346,
  590037,
  459021,
  524394,
  524330,
  590005,
  524298,
  524426,
  524362,
  590069,
  459011,
  524374,
  524310,
  524574,
  459027,
  524406,
  524342,
  590029,
  459019,
  524390,
  524326,
  589997,
  524294,
  524422,
  524358,
  590061,
  459015,
  524382,
  524318,
  589981,
  459031,
  524414,
  524350,
  590045,
  459023,
  524398,
  524334,
  590013,
  524302,
  524430,
  524366,
  590077,
  459008,
  524369,
  524305,
  524569,
  459024,
  524401,
  524337,
  590019,
  459016,
  524385,
  524321,
  589987,
  524289,
  524417,
  524353,
  590051,
  459012,
  524377,
  524313,
  589971,
  459028,
  524409,
  524345,
  590035,
  459020,
  524393,
  524329,
  590003,
  524297,
  524425,
  524361,
  590067,
  459010,
  524373,
  524309,
  524573,
  459026,
  524405,
  524341,
  590027,
  459018,
  524389,
  524325,
  589995,
  524293,
  524421,
  524357,
  590059,
  459014,
  524381,
  524317,
  589979,
  459030,
  524413,
  524349,
  590043,
  459022,
  524397,
  524333,
  590011,
  524301,
  524429,
  524365,
  590075,
  459009,
  524371,
  524307,
  524571,
  459025,
  524403,
  524339,
  590023,
  459017,
  524387,
  524323,
  589991,
  524291,
  524419,
  524355,
  590055,
  459013,
  524379,
  524315,
  589975,
  459029,
  524411,
  524347,
  590039,
  459021,
  524395,
  524331,
  590007,
  524299,
  524427,
  524363,
  590071,
  459011,
  524375,
  524311,
  524575,
  459027,
  524407,
  524343,
  590031,
  459019,
  524391,
  524327,
  589999,
  524295,
  524423,
  524359,
  590063,
  459015,
  524383,
  524319,
  589983,
  459031,
  524415,
  524351,
  590047,
  459023,
  524399,
  524335,
  590015,
  524303,
  524431,
  524367,
  590079
]), 9];
var fixedDistCodeTab = [new Int32Array([
  327680,
  327696,
  327688,
  327704,
  327684,
  327700,
  327692,
  327708,
  327682,
  327698,
  327690,
  327706,
  327686,
  327702,
  327694,
  0,
  327681,
  327697,
  327689,
  327705,
  327685,
  327701,
  327693,
  327709,
  327683,
  327699,
  327691,
  327707,
  327687,
  327703,
  327695,
  0
]), 5];
var FlateStream = (
  /** @class */
  function(_super) {
    __extends(FlateStream2, _super);
    function FlateStream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
      var cmf = stream2.getByte();
      var flg = stream2.getByte();
      if (cmf === -1 || flg === -1) {
        throw new Error("Invalid header in flate stream: " + cmf + ", " + flg);
      }
      if ((cmf & 15) !== 8) {
        throw new Error("Unknown compression method in flate stream: " + cmf + ", " + flg);
      }
      if (((cmf << 8) + flg) % 31 !== 0) {
        throw new Error("Bad FCHECK in flate stream: " + cmf + ", " + flg);
      }
      if (flg & 32) {
        throw new Error("FDICT bit set in flate stream: " + cmf + ", " + flg);
      }
      _this.codeSize = 0;
      _this.codeBuf = 0;
      return _this;
    }
    FlateStream2.prototype.readBlock = function() {
      var buffer;
      var len;
      var str = this.stream;
      var hdr = this.getBits(3);
      if (hdr & 1) {
        this.eof = true;
      }
      hdr >>= 1;
      if (hdr === 0) {
        var b = void 0;
        if ((b = str.getByte()) === -1) {
          throw new Error("Bad block header in flate stream");
        }
        var blockLen = b;
        if ((b = str.getByte()) === -1) {
          throw new Error("Bad block header in flate stream");
        }
        blockLen |= b << 8;
        if ((b = str.getByte()) === -1) {
          throw new Error("Bad block header in flate stream");
        }
        var check = b;
        if ((b = str.getByte()) === -1) {
          throw new Error("Bad block header in flate stream");
        }
        check |= b << 8;
        if (check !== (~blockLen & 65535) && (blockLen !== 0 || check !== 0)) {
          throw new Error("Bad uncompressed block length in flate stream");
        }
        this.codeBuf = 0;
        this.codeSize = 0;
        var bufferLength = this.bufferLength;
        buffer = this.ensureBuffer(bufferLength + blockLen);
        var end = bufferLength + blockLen;
        this.bufferLength = end;
        if (blockLen === 0) {
          if (str.peekByte() === -1) {
            this.eof = true;
          }
        } else {
          for (var n = bufferLength; n < end; ++n) {
            if ((b = str.getByte()) === -1) {
              this.eof = true;
              break;
            }
            buffer[n] = b;
          }
        }
        return;
      }
      var litCodeTable;
      var distCodeTable;
      if (hdr === 1) {
        litCodeTable = fixedLitCodeTab;
        distCodeTable = fixedDistCodeTab;
      } else if (hdr === 2) {
        var numLitCodes = this.getBits(5) + 257;
        var numDistCodes = this.getBits(5) + 1;
        var numCodeLenCodes = this.getBits(4) + 4;
        var codeLenCodeLengths = new Uint8Array(codeLenCodeMap.length);
        var i = void 0;
        for (i = 0; i < numCodeLenCodes; ++i) {
          codeLenCodeLengths[codeLenCodeMap[i]] = this.getBits(3);
        }
        var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);
        len = 0;
        i = 0;
        var codes = numLitCodes + numDistCodes;
        var codeLengths = new Uint8Array(codes);
        var bitsLength = void 0;
        var bitsOffset = void 0;
        var what = void 0;
        while (i < codes) {
          var code = this.getCode(codeLenCodeTab);
          if (code === 16) {
            bitsLength = 2;
            bitsOffset = 3;
            what = len;
          } else if (code === 17) {
            bitsLength = 3;
            bitsOffset = 3;
            what = len = 0;
          } else if (code === 18) {
            bitsLength = 7;
            bitsOffset = 11;
            what = len = 0;
          } else {
            codeLengths[i++] = len = code;
            continue;
          }
          var repeatLength = this.getBits(bitsLength) + bitsOffset;
          while (repeatLength-- > 0) {
            codeLengths[i++] = what;
          }
        }
        litCodeTable = this.generateHuffmanTable(codeLengths.subarray(0, numLitCodes));
        distCodeTable = this.generateHuffmanTable(codeLengths.subarray(numLitCodes, codes));
      } else {
        throw new Error("Unknown block type in flate stream");
      }
      buffer = this.buffer;
      var limit = buffer ? buffer.length : 0;
      var pos = this.bufferLength;
      while (true) {
        var code1 = this.getCode(litCodeTable);
        if (code1 < 256) {
          if (pos + 1 >= limit) {
            buffer = this.ensureBuffer(pos + 1);
            limit = buffer.length;
          }
          buffer[pos++] = code1;
          continue;
        }
        if (code1 === 256) {
          this.bufferLength = pos;
          return;
        }
        code1 -= 257;
        code1 = lengthDecode[code1];
        var code2 = code1 >> 16;
        if (code2 > 0) {
          code2 = this.getBits(code2);
        }
        len = (code1 & 65535) + code2;
        code1 = this.getCode(distCodeTable);
        code1 = distDecode[code1];
        code2 = code1 >> 16;
        if (code2 > 0) {
          code2 = this.getBits(code2);
        }
        var dist = (code1 & 65535) + code2;
        if (pos + len >= limit) {
          buffer = this.ensureBuffer(pos + len);
          limit = buffer.length;
        }
        for (var k = 0; k < len; ++k, ++pos) {
          buffer[pos] = buffer[pos - dist];
        }
      }
    };
    FlateStream2.prototype.getBits = function(bits) {
      var str = this.stream;
      var codeSize = this.codeSize;
      var codeBuf = this.codeBuf;
      var b;
      while (codeSize < bits) {
        if ((b = str.getByte()) === -1) {
          throw new Error("Bad encoding in flate stream");
        }
        codeBuf |= b << codeSize;
        codeSize += 8;
      }
      b = codeBuf & (1 << bits) - 1;
      this.codeBuf = codeBuf >> bits;
      this.codeSize = codeSize -= bits;
      return b;
    };
    FlateStream2.prototype.getCode = function(table) {
      var str = this.stream;
      var codes = table[0];
      var maxLen = table[1];
      var codeSize = this.codeSize;
      var codeBuf = this.codeBuf;
      var b;
      while (codeSize < maxLen) {
        if ((b = str.getByte()) === -1) {
          break;
        }
        codeBuf |= b << codeSize;
        codeSize += 8;
      }
      var code = codes[codeBuf & (1 << maxLen) - 1];
      if (typeof codes === "number") {
        console.log("FLATE:", code);
      }
      var codeLen = code >> 16;
      var codeVal = code & 65535;
      if (codeLen < 1 || codeSize < codeLen) {
        throw new Error("Bad encoding in flate stream");
      }
      this.codeBuf = codeBuf >> codeLen;
      this.codeSize = codeSize - codeLen;
      return codeVal;
    };
    FlateStream2.prototype.generateHuffmanTable = function(lengths) {
      var n = lengths.length;
      var maxLen = 0;
      var i;
      for (i = 0; i < n; ++i) {
        if (lengths[i] > maxLen) {
          maxLen = lengths[i];
        }
      }
      var size = 1 << maxLen;
      var codes = new Int32Array(size);
      for (var len = 1, code = 0, skip = 2; len <= maxLen; ++len, code <<= 1, skip <<= 1) {
        for (var val = 0; val < n; ++val) {
          if (lengths[val] === len) {
            var code2 = 0;
            var t = code;
            for (i = 0; i < len; ++i) {
              code2 = code2 << 1 | t & 1;
              t >>= 1;
            }
            for (i = code2; i < size; i += skip) {
              codes[i] = len << 16 | val;
            }
            ++code;
          }
        }
      }
      return [codes, maxLen];
    };
    return FlateStream2;
  }(DecodeStream)
);
var LZWStream = (
  /** @class */
  function(_super) {
    __extends(LZWStream2, _super);
    function LZWStream2(stream2, maybeLength, earlyChange) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
      _this.cachedData = 0;
      _this.bitsCached = 0;
      var maxLzwDictionarySize = 4096;
      var lzwState = {
        earlyChange,
        codeLength: 9,
        nextCode: 258,
        dictionaryValues: new Uint8Array(maxLzwDictionarySize),
        dictionaryLengths: new Uint16Array(maxLzwDictionarySize),
        dictionaryPrevCodes: new Uint16Array(maxLzwDictionarySize),
        currentSequence: new Uint8Array(maxLzwDictionarySize),
        currentSequenceLength: 0
      };
      for (var i = 0; i < 256; ++i) {
        lzwState.dictionaryValues[i] = i;
        lzwState.dictionaryLengths[i] = 1;
      }
      _this.lzwState = lzwState;
      return _this;
    }
    LZWStream2.prototype.readBlock = function() {
      var blockSize = 512;
      var estimatedDecodedSize = blockSize * 2;
      var decodedSizeDelta = blockSize;
      var i;
      var j;
      var q;
      var lzwState = this.lzwState;
      if (!lzwState) {
        return;
      }
      var earlyChange = lzwState.earlyChange;
      var nextCode = lzwState.nextCode;
      var dictionaryValues = lzwState.dictionaryValues;
      var dictionaryLengths = lzwState.dictionaryLengths;
      var dictionaryPrevCodes = lzwState.dictionaryPrevCodes;
      var codeLength = lzwState.codeLength;
      var prevCode = lzwState.prevCode;
      var currentSequence = lzwState.currentSequence;
      var currentSequenceLength = lzwState.currentSequenceLength;
      var decodedLength = 0;
      var currentBufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
      for (i = 0; i < blockSize; i++) {
        var code = this.readBits(codeLength);
        var hasPrev = currentSequenceLength > 0;
        if (!code || code < 256) {
          currentSequence[0] = code;
          currentSequenceLength = 1;
        } else if (code >= 258) {
          if (code < nextCode) {
            currentSequenceLength = dictionaryLengths[code];
            for (j = currentSequenceLength - 1, q = code; j >= 0; j--) {
              currentSequence[j] = dictionaryValues[q];
              q = dictionaryPrevCodes[q];
            }
          } else {
            currentSequence[currentSequenceLength++] = currentSequence[0];
          }
        } else if (code === 256) {
          codeLength = 9;
          nextCode = 258;
          currentSequenceLength = 0;
          continue;
        } else {
          this.eof = true;
          delete this.lzwState;
          break;
        }
        if (hasPrev) {
          dictionaryPrevCodes[nextCode] = prevCode;
          dictionaryLengths[nextCode] = dictionaryLengths[prevCode] + 1;
          dictionaryValues[nextCode] = currentSequence[0];
          nextCode++;
          codeLength = nextCode + earlyChange & nextCode + earlyChange - 1 ? codeLength : Math.min(Math.log(nextCode + earlyChange) / 0.6931471805599453 + 1, 12) | 0;
        }
        prevCode = code;
        decodedLength += currentSequenceLength;
        if (estimatedDecodedSize < decodedLength) {
          do {
            estimatedDecodedSize += decodedSizeDelta;
          } while (estimatedDecodedSize < decodedLength);
          buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
        }
        for (j = 0; j < currentSequenceLength; j++) {
          buffer[currentBufferLength++] = currentSequence[j];
        }
      }
      lzwState.nextCode = nextCode;
      lzwState.codeLength = codeLength;
      lzwState.prevCode = prevCode;
      lzwState.currentSequenceLength = currentSequenceLength;
      this.bufferLength = currentBufferLength;
    };
    LZWStream2.prototype.readBits = function(n) {
      var bitsCached = this.bitsCached;
      var cachedData = this.cachedData;
      while (bitsCached < n) {
        var c = this.stream.getByte();
        if (c === -1) {
          this.eof = true;
          return null;
        }
        cachedData = cachedData << 8 | c;
        bitsCached += 8;
      }
      this.bitsCached = bitsCached -= n;
      this.cachedData = cachedData;
      return cachedData >>> bitsCached & (1 << n) - 1;
    };
    return LZWStream2;
  }(DecodeStream)
);
var RunLengthStream = (
  /** @class */
  function(_super) {
    __extends(RunLengthStream2, _super);
    function RunLengthStream2(stream2, maybeLength) {
      var _this = _super.call(this, maybeLength) || this;
      _this.stream = stream2;
      return _this;
    }
    RunLengthStream2.prototype.readBlock = function() {
      var repeatHeader = this.stream.getBytes(2);
      if (!repeatHeader || repeatHeader.length < 2 || repeatHeader[0] === 128) {
        this.eof = true;
        return;
      }
      var buffer;
      var bufferLength = this.bufferLength;
      var n = repeatHeader[0];
      if (n < 128) {
        buffer = this.ensureBuffer(bufferLength + n + 1);
        buffer[bufferLength++] = repeatHeader[1];
        if (n > 0) {
          var source = this.stream.getBytes(n);
          buffer.set(source, bufferLength);
          bufferLength += n;
        }
      } else {
        n = 257 - n;
        var b = repeatHeader[1];
        buffer = this.ensureBuffer(bufferLength + n + 1);
        for (var i = 0; i < n; i++) {
          buffer[bufferLength++] = b;
        }
      }
      this.bufferLength = bufferLength;
    };
    return RunLengthStream2;
  }(DecodeStream)
);
var decodeStream = function(stream2, encoding, params) {
  if (encoding === PDFName.of("FlateDecode")) {
    return new FlateStream(stream2);
  }
  if (encoding === PDFName.of("LZWDecode")) {
    var earlyChange = 1;
    if (params instanceof PDFDict) {
      var EarlyChange = params.lookup(PDFName.of("EarlyChange"));
      if (EarlyChange instanceof PDFNumber) {
        earlyChange = EarlyChange.asNumber();
      }
    }
    return new LZWStream(stream2, void 0, earlyChange);
  }
  if (encoding === PDFName.of("ASCII85Decode")) {
    return new Ascii85Stream(stream2);
  }
  if (encoding === PDFName.of("ASCIIHexDecode")) {
    return new AsciiHexStream(stream2);
  }
  if (encoding === PDFName.of("RunLengthDecode")) {
    return new RunLengthStream(stream2);
  }
  throw new UnsupportedEncodingError(encoding.asString());
};
var decodePDFRawStream = function(_a2) {
  var dict = _a2.dict, contents = _a2.contents;
  var stream2 = new Stream(contents);
  var Filter = dict.lookup(PDFName.of("Filter"));
  var DecodeParms = dict.lookup(PDFName.of("DecodeParms"));
  if (Filter instanceof PDFName) {
    stream2 = decodeStream(stream2, Filter, DecodeParms);
  } else if (Filter instanceof PDFArray) {
    for (var idx = 0, len = Filter.size(); idx < len; idx++) {
      stream2 = decodeStream(stream2, Filter.lookup(idx, PDFName), DecodeParms && DecodeParms.lookupMaybe(idx, PDFDict));
    }
  } else if (!!Filter) {
    throw new UnexpectedObjectTypeError([PDFName, PDFArray], Filter);
  }
  return stream2;
};
var fullPageBoundingBox = function(page) {
  var mediaBox = page.MediaBox();
  var width = mediaBox.lookup(2, PDFNumber).asNumber() - mediaBox.lookup(0, PDFNumber).asNumber();
  var height = mediaBox.lookup(3, PDFNumber).asNumber() - mediaBox.lookup(1, PDFNumber).asNumber();
  return { left: 0, bottom: 0, right: width, top: height };
};
var boundingBoxAdjustedMatrix = function(bb) {
  return [1, 0, 0, 1, -bb.left, -bb.bottom];
};
var PDFPageEmbedder = (
  /** @class */
  function() {
    function PDFPageEmbedder2(page, boundingBox, transformationMatrix) {
      this.page = page;
      var bb = boundingBox !== null && boundingBox !== void 0 ? boundingBox : fullPageBoundingBox(page);
      this.width = bb.right - bb.left;
      this.height = bb.top - bb.bottom;
      this.boundingBox = bb;
      this.transformationMatrix = transformationMatrix !== null && transformationMatrix !== void 0 ? transformationMatrix : boundingBoxAdjustedMatrix(bb);
    }
    PDFPageEmbedder2.for = function(page, boundingBox, transformationMatrix) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          return [2, new PDFPageEmbedder2(page, boundingBox, transformationMatrix)];
        });
      });
    };
    PDFPageEmbedder2.prototype.embedIntoContext = function(context, ref) {
      return __awaiter(this, void 0, void 0, function() {
        var _a2, Contents, Resources, decodedContents, _b2, left, bottom, right, top, xObject;
        return __generator(this, function(_c) {
          _a2 = this.page.normalizedEntries(), Contents = _a2.Contents, Resources = _a2.Resources;
          if (!Contents)
            throw new MissingPageContentsEmbeddingError();
          decodedContents = this.decodeContents(Contents);
          _b2 = this.boundingBox, left = _b2.left, bottom = _b2.bottom, right = _b2.right, top = _b2.top;
          xObject = context.flateStream(decodedContents, {
            Type: "XObject",
            Subtype: "Form",
            FormType: 1,
            BBox: [left, bottom, right, top],
            Matrix: this.transformationMatrix,
            Resources
          });
          if (ref) {
            context.assign(ref, xObject);
            return [2, ref];
          } else {
            return [2, context.register(xObject)];
          }
        });
      });
    };
    PDFPageEmbedder2.prototype.decodeContents = function(contents) {
      var newline = Uint8Array.of(CharCodes$1.Newline);
      var decodedContents = [];
      for (var idx = 0, len = contents.size(); idx < len; idx++) {
        var stream2 = contents.lookup(idx, PDFStream);
        var content = void 0;
        if (stream2 instanceof PDFRawStream) {
          content = decodePDFRawStream(stream2).decode();
        } else if (stream2 instanceof PDFContentStream) {
          content = stream2.getUnencodedContents();
        } else {
          throw new UnrecognizedStreamTypeError(stream2);
        }
        decodedContents.push(content, newline);
      }
      return mergeIntoTypedArray.apply(void 0, decodedContents);
    };
    return PDFPageEmbedder2;
  }()
);
var asEnum = function(rawValue, enumType) {
  if (rawValue === void 0)
    return void 0;
  return enumType[rawValue];
};
var NonFullScreenPageMode;
(function(NonFullScreenPageMode2) {
  NonFullScreenPageMode2["UseNone"] = "UseNone";
  NonFullScreenPageMode2["UseOutlines"] = "UseOutlines";
  NonFullScreenPageMode2["UseThumbs"] = "UseThumbs";
  NonFullScreenPageMode2["UseOC"] = "UseOC";
})(NonFullScreenPageMode || (NonFullScreenPageMode = {}));
var ReadingDirection;
(function(ReadingDirection2) {
  ReadingDirection2["L2R"] = "L2R";
  ReadingDirection2["R2L"] = "R2L";
})(ReadingDirection || (ReadingDirection = {}));
var PrintScaling;
(function(PrintScaling2) {
  PrintScaling2["None"] = "None";
  PrintScaling2["AppDefault"] = "AppDefault";
})(PrintScaling || (PrintScaling = {}));
var Duplex;
(function(Duplex2) {
  Duplex2["Simplex"] = "Simplex";
  Duplex2["DuplexFlipShortEdge"] = "DuplexFlipShortEdge";
  Duplex2["DuplexFlipLongEdge"] = "DuplexFlipLongEdge";
})(Duplex || (Duplex = {}));
var ViewerPreferences = (
  /** @class */
  function() {
    function ViewerPreferences2(dict) {
      this.dict = dict;
    }
    ViewerPreferences2.prototype.lookupBool = function(key) {
      var returnObj = this.dict.lookup(PDFName.of(key));
      if (returnObj instanceof PDFBool)
        return returnObj;
      return void 0;
    };
    ViewerPreferences2.prototype.lookupName = function(key) {
      var returnObj = this.dict.lookup(PDFName.of(key));
      if (returnObj instanceof PDFName)
        return returnObj;
      return void 0;
    };
    ViewerPreferences2.prototype.HideToolbar = function() {
      return this.lookupBool("HideToolbar");
    };
    ViewerPreferences2.prototype.HideMenubar = function() {
      return this.lookupBool("HideMenubar");
    };
    ViewerPreferences2.prototype.HideWindowUI = function() {
      return this.lookupBool("HideWindowUI");
    };
    ViewerPreferences2.prototype.FitWindow = function() {
      return this.lookupBool("FitWindow");
    };
    ViewerPreferences2.prototype.CenterWindow = function() {
      return this.lookupBool("CenterWindow");
    };
    ViewerPreferences2.prototype.DisplayDocTitle = function() {
      return this.lookupBool("DisplayDocTitle");
    };
    ViewerPreferences2.prototype.NonFullScreenPageMode = function() {
      return this.lookupName("NonFullScreenPageMode");
    };
    ViewerPreferences2.prototype.Direction = function() {
      return this.lookupName("Direction");
    };
    ViewerPreferences2.prototype.PrintScaling = function() {
      return this.lookupName("PrintScaling");
    };
    ViewerPreferences2.prototype.Duplex = function() {
      return this.lookupName("Duplex");
    };
    ViewerPreferences2.prototype.PickTrayByPDFSize = function() {
      return this.lookupBool("PickTrayByPDFSize");
    };
    ViewerPreferences2.prototype.PrintPageRange = function() {
      var PrintPageRange = this.dict.lookup(PDFName.of("PrintPageRange"));
      if (PrintPageRange instanceof PDFArray)
        return PrintPageRange;
      return void 0;
    };
    ViewerPreferences2.prototype.NumCopies = function() {
      var NumCopies = this.dict.lookup(PDFName.of("NumCopies"));
      if (NumCopies instanceof PDFNumber)
        return NumCopies;
      return void 0;
    };
    ViewerPreferences2.prototype.getHideToolbar = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.HideToolbar()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean()) !== null && _b2 !== void 0 ? _b2 : false;
    };
    ViewerPreferences2.prototype.getHideMenubar = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.HideMenubar()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean()) !== null && _b2 !== void 0 ? _b2 : false;
    };
    ViewerPreferences2.prototype.getHideWindowUI = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.HideWindowUI()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean()) !== null && _b2 !== void 0 ? _b2 : false;
    };
    ViewerPreferences2.prototype.getFitWindow = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.FitWindow()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean()) !== null && _b2 !== void 0 ? _b2 : false;
    };
    ViewerPreferences2.prototype.getCenterWindow = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.CenterWindow()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean()) !== null && _b2 !== void 0 ? _b2 : false;
    };
    ViewerPreferences2.prototype.getDisplayDocTitle = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.DisplayDocTitle()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean()) !== null && _b2 !== void 0 ? _b2 : false;
    };
    ViewerPreferences2.prototype.getNonFullScreenPageMode = function() {
      var _a2, _b2;
      var mode = (_a2 = this.NonFullScreenPageMode()) === null || _a2 === void 0 ? void 0 : _a2.decodeText();
      return (_b2 = asEnum(mode, NonFullScreenPageMode)) !== null && _b2 !== void 0 ? _b2 : NonFullScreenPageMode.UseNone;
    };
    ViewerPreferences2.prototype.getReadingDirection = function() {
      var _a2, _b2;
      var direction = (_a2 = this.Direction()) === null || _a2 === void 0 ? void 0 : _a2.decodeText();
      return (_b2 = asEnum(direction, ReadingDirection)) !== null && _b2 !== void 0 ? _b2 : ReadingDirection.L2R;
    };
    ViewerPreferences2.prototype.getPrintScaling = function() {
      var _a2, _b2;
      var scaling = (_a2 = this.PrintScaling()) === null || _a2 === void 0 ? void 0 : _a2.decodeText();
      return (_b2 = asEnum(scaling, PrintScaling)) !== null && _b2 !== void 0 ? _b2 : PrintScaling.AppDefault;
    };
    ViewerPreferences2.prototype.getDuplex = function() {
      var _a2;
      var duplex = (_a2 = this.Duplex()) === null || _a2 === void 0 ? void 0 : _a2.decodeText();
      return asEnum(duplex, Duplex);
    };
    ViewerPreferences2.prototype.getPickTrayByPDFSize = function() {
      var _a2;
      return (_a2 = this.PickTrayByPDFSize()) === null || _a2 === void 0 ? void 0 : _a2.asBoolean();
    };
    ViewerPreferences2.prototype.getPrintPageRange = function() {
      var rng = this.PrintPageRange();
      if (!rng)
        return [];
      var pageRanges = [];
      for (var i = 0; i < rng.size(); i += 2) {
        var start = rng.lookup(i, PDFNumber).asNumber();
        var end = rng.lookup(i + 1, PDFNumber).asNumber();
        pageRanges.push({ start, end });
      }
      return pageRanges;
    };
    ViewerPreferences2.prototype.getNumCopies = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.NumCopies()) === null || _a2 === void 0 ? void 0 : _a2.asNumber()) !== null && _b2 !== void 0 ? _b2 : 1;
    };
    ViewerPreferences2.prototype.setHideToolbar = function(hideToolbar) {
      var HideToolbar = this.dict.context.obj(hideToolbar);
      this.dict.set(PDFName.of("HideToolbar"), HideToolbar);
    };
    ViewerPreferences2.prototype.setHideMenubar = function(hideMenubar) {
      var HideMenubar = this.dict.context.obj(hideMenubar);
      this.dict.set(PDFName.of("HideMenubar"), HideMenubar);
    };
    ViewerPreferences2.prototype.setHideWindowUI = function(hideWindowUI) {
      var HideWindowUI = this.dict.context.obj(hideWindowUI);
      this.dict.set(PDFName.of("HideWindowUI"), HideWindowUI);
    };
    ViewerPreferences2.prototype.setFitWindow = function(fitWindow) {
      var FitWindow = this.dict.context.obj(fitWindow);
      this.dict.set(PDFName.of("FitWindow"), FitWindow);
    };
    ViewerPreferences2.prototype.setCenterWindow = function(centerWindow) {
      var CenterWindow = this.dict.context.obj(centerWindow);
      this.dict.set(PDFName.of("CenterWindow"), CenterWindow);
    };
    ViewerPreferences2.prototype.setDisplayDocTitle = function(displayTitle) {
      var DisplayDocTitle = this.dict.context.obj(displayTitle);
      this.dict.set(PDFName.of("DisplayDocTitle"), DisplayDocTitle);
    };
    ViewerPreferences2.prototype.setNonFullScreenPageMode = function(nonFullScreenPageMode) {
      assertIsOneOf(nonFullScreenPageMode, "nonFullScreenPageMode", NonFullScreenPageMode);
      var mode = PDFName.of(nonFullScreenPageMode);
      this.dict.set(PDFName.of("NonFullScreenPageMode"), mode);
    };
    ViewerPreferences2.prototype.setReadingDirection = function(readingDirection) {
      assertIsOneOf(readingDirection, "readingDirection", ReadingDirection);
      var direction = PDFName.of(readingDirection);
      this.dict.set(PDFName.of("Direction"), direction);
    };
    ViewerPreferences2.prototype.setPrintScaling = function(printScaling) {
      assertIsOneOf(printScaling, "printScaling", PrintScaling);
      var scaling = PDFName.of(printScaling);
      this.dict.set(PDFName.of("PrintScaling"), scaling);
    };
    ViewerPreferences2.prototype.setDuplex = function(duplex) {
      assertIsOneOf(duplex, "duplex", Duplex);
      var dup = PDFName.of(duplex);
      this.dict.set(PDFName.of("Duplex"), dup);
    };
    ViewerPreferences2.prototype.setPickTrayByPDFSize = function(pickTrayByPDFSize) {
      var PickTrayByPDFSize = this.dict.context.obj(pickTrayByPDFSize);
      this.dict.set(PDFName.of("PickTrayByPDFSize"), PickTrayByPDFSize);
    };
    ViewerPreferences2.prototype.setPrintPageRange = function(printPageRange) {
      if (!Array.isArray(printPageRange))
        printPageRange = [printPageRange];
      var flatRange = [];
      for (var idx = 0, len = printPageRange.length; idx < len; idx++) {
        flatRange.push(printPageRange[idx].start);
        flatRange.push(printPageRange[idx].end);
      }
      assertEachIs(flatRange, "printPageRange", ["number"]);
      var pageRanges = this.dict.context.obj(flatRange);
      this.dict.set(PDFName.of("PrintPageRange"), pageRanges);
    };
    ViewerPreferences2.prototype.setNumCopies = function(numCopies) {
      assertRange(numCopies, "numCopies", 1, Number.MAX_VALUE);
      assertInteger(numCopies, "numCopies");
      var NumCopies = this.dict.context.obj(numCopies);
      this.dict.set(PDFName.of("NumCopies"), NumCopies);
    };
    ViewerPreferences2.fromDict = function(dict) {
      return new ViewerPreferences2(dict);
    };
    ViewerPreferences2.create = function(context) {
      var dict = context.obj({});
      return new ViewerPreferences2(dict);
    };
    return ViewerPreferences2;
  }()
);
var tfRegex$1 = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+Tf/;
var PDFAcroField = (
  /** @class */
  function() {
    function PDFAcroField2(dict, ref) {
      this.dict = dict;
      this.ref = ref;
    }
    PDFAcroField2.prototype.T = function() {
      return this.dict.lookupMaybe(PDFName.of("T"), PDFString, PDFHexString);
    };
    PDFAcroField2.prototype.Ff = function() {
      var numberOrRef = this.getInheritableAttribute(PDFName.of("Ff"));
      return this.dict.context.lookupMaybe(numberOrRef, PDFNumber);
    };
    PDFAcroField2.prototype.V = function() {
      var valueOrRef = this.getInheritableAttribute(PDFName.of("V"));
      return this.dict.context.lookup(valueOrRef);
    };
    PDFAcroField2.prototype.Kids = function() {
      return this.dict.lookupMaybe(PDFName.of("Kids"), PDFArray);
    };
    PDFAcroField2.prototype.DA = function() {
      var da = this.dict.lookup(PDFName.of("DA"));
      if (da instanceof PDFString || da instanceof PDFHexString)
        return da;
      return void 0;
    };
    PDFAcroField2.prototype.setKids = function(kids) {
      this.dict.set(PDFName.of("Kids"), this.dict.context.obj(kids));
    };
    PDFAcroField2.prototype.getParent = function() {
      var parentRef = this.dict.get(PDFName.of("Parent"));
      if (parentRef instanceof PDFRef) {
        var parent_1 = this.dict.lookup(PDFName.of("Parent"), PDFDict);
        return new PDFAcroField2(parent_1, parentRef);
      }
      return void 0;
    };
    PDFAcroField2.prototype.setParent = function(parent) {
      if (!parent)
        this.dict.delete(PDFName.of("Parent"));
      else
        this.dict.set(PDFName.of("Parent"), parent);
    };
    PDFAcroField2.prototype.getFullyQualifiedName = function() {
      var parent = this.getParent();
      if (!parent)
        return this.getPartialName();
      return parent.getFullyQualifiedName() + "." + this.getPartialName();
    };
    PDFAcroField2.prototype.getPartialName = function() {
      var _a2;
      return (_a2 = this.T()) === null || _a2 === void 0 ? void 0 : _a2.decodeText();
    };
    PDFAcroField2.prototype.setPartialName = function(partialName) {
      if (!partialName)
        this.dict.delete(PDFName.of("T"));
      else
        this.dict.set(PDFName.of("T"), PDFHexString.fromText(partialName));
    };
    PDFAcroField2.prototype.setDefaultAppearance = function(appearance) {
      this.dict.set(PDFName.of("DA"), PDFString.of(appearance));
    };
    PDFAcroField2.prototype.getDefaultAppearance = function() {
      var DA = this.DA();
      if (DA instanceof PDFHexString) {
        return DA.decodeText();
      }
      return DA === null || DA === void 0 ? void 0 : DA.asString();
    };
    PDFAcroField2.prototype.setFontSize = function(fontSize) {
      var _a2;
      var name = (_a2 = this.getFullyQualifiedName()) !== null && _a2 !== void 0 ? _a2 : "";
      var da = this.getDefaultAppearance();
      if (!da)
        throw new MissingDAEntryError(name);
      var daMatch = findLastMatch(da, tfRegex$1);
      if (!daMatch.match)
        throw new MissingTfOperatorError(name);
      var daStart = da.slice(0, daMatch.pos - daMatch.match[0].length);
      var daEnd = daMatch.pos <= da.length ? da.slice(daMatch.pos) : "";
      var fontName = daMatch.match[1];
      var modifiedDa = daStart + " /" + fontName + " " + fontSize + " Tf " + daEnd;
      this.setDefaultAppearance(modifiedDa);
    };
    PDFAcroField2.prototype.getFlags = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.Ff()) === null || _a2 === void 0 ? void 0 : _a2.asNumber()) !== null && _b2 !== void 0 ? _b2 : 0;
    };
    PDFAcroField2.prototype.setFlags = function(flags) {
      this.dict.set(PDFName.of("Ff"), PDFNumber.of(flags));
    };
    PDFAcroField2.prototype.hasFlag = function(flag2) {
      var flags = this.getFlags();
      return (flags & flag2) !== 0;
    };
    PDFAcroField2.prototype.setFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags | flag2);
    };
    PDFAcroField2.prototype.clearFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags & ~flag2);
    };
    PDFAcroField2.prototype.setFlagTo = function(flag2, enable) {
      if (enable)
        this.setFlag(flag2);
      else
        this.clearFlag(flag2);
    };
    PDFAcroField2.prototype.getInheritableAttribute = function(name) {
      var attribute;
      this.ascend(function(node) {
        if (!attribute)
          attribute = node.dict.get(name);
      });
      return attribute;
    };
    PDFAcroField2.prototype.ascend = function(visitor) {
      visitor(this);
      var parent = this.getParent();
      if (parent)
        parent.ascend(visitor);
    };
    return PDFAcroField2;
  }()
);
var BorderStyle = (
  /** @class */
  function() {
    function BorderStyle2(dict) {
      this.dict = dict;
    }
    BorderStyle2.prototype.W = function() {
      var W = this.dict.lookup(PDFName.of("W"));
      if (W instanceof PDFNumber)
        return W;
      return void 0;
    };
    BorderStyle2.prototype.getWidth = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.W()) === null || _a2 === void 0 ? void 0 : _a2.asNumber()) !== null && _b2 !== void 0 ? _b2 : 1;
    };
    BorderStyle2.prototype.setWidth = function(width) {
      var W = this.dict.context.obj(width);
      this.dict.set(PDFName.of("W"), W);
    };
    BorderStyle2.fromDict = function(dict) {
      return new BorderStyle2(dict);
    };
    return BorderStyle2;
  }()
);
var PDFAnnotation = (
  /** @class */
  function() {
    function PDFAnnotation2(dict) {
      this.dict = dict;
    }
    PDFAnnotation2.prototype.Rect = function() {
      return this.dict.lookup(PDFName.of("Rect"), PDFArray);
    };
    PDFAnnotation2.prototype.AP = function() {
      return this.dict.lookupMaybe(PDFName.of("AP"), PDFDict);
    };
    PDFAnnotation2.prototype.F = function() {
      var numberOrRef = this.dict.lookup(PDFName.of("F"));
      return this.dict.context.lookupMaybe(numberOrRef, PDFNumber);
    };
    PDFAnnotation2.prototype.getRectangle = function() {
      var _a2;
      var Rect = this.Rect();
      return (_a2 = Rect === null || Rect === void 0 ? void 0 : Rect.asRectangle()) !== null && _a2 !== void 0 ? _a2 : { x: 0, y: 0, width: 0, height: 0 };
    };
    PDFAnnotation2.prototype.setRectangle = function(rect) {
      var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
      var Rect = this.dict.context.obj([x, y, x + width, y + height]);
      this.dict.set(PDFName.of("Rect"), Rect);
    };
    PDFAnnotation2.prototype.getAppearanceState = function() {
      var AS = this.dict.lookup(PDFName.of("AS"));
      if (AS instanceof PDFName)
        return AS;
      return void 0;
    };
    PDFAnnotation2.prototype.setAppearanceState = function(state) {
      this.dict.set(PDFName.of("AS"), state);
    };
    PDFAnnotation2.prototype.setAppearances = function(appearances) {
      this.dict.set(PDFName.of("AP"), appearances);
    };
    PDFAnnotation2.prototype.ensureAP = function() {
      var AP = this.AP();
      if (!AP) {
        AP = this.dict.context.obj({});
        this.dict.set(PDFName.of("AP"), AP);
      }
      return AP;
    };
    PDFAnnotation2.prototype.getNormalAppearance = function() {
      var AP = this.ensureAP();
      var N = AP.get(PDFName.of("N"));
      if (N instanceof PDFRef || N instanceof PDFDict)
        return N;
      throw new Error("Unexpected N type: " + (N === null || N === void 0 ? void 0 : N.constructor.name));
    };
    PDFAnnotation2.prototype.setNormalAppearance = function(appearance) {
      var AP = this.ensureAP();
      AP.set(PDFName.of("N"), appearance);
    };
    PDFAnnotation2.prototype.setRolloverAppearance = function(appearance) {
      var AP = this.ensureAP();
      AP.set(PDFName.of("R"), appearance);
    };
    PDFAnnotation2.prototype.setDownAppearance = function(appearance) {
      var AP = this.ensureAP();
      AP.set(PDFName.of("D"), appearance);
    };
    PDFAnnotation2.prototype.removeRolloverAppearance = function() {
      var AP = this.AP();
      AP === null || AP === void 0 ? void 0 : AP.delete(PDFName.of("R"));
    };
    PDFAnnotation2.prototype.removeDownAppearance = function() {
      var AP = this.AP();
      AP === null || AP === void 0 ? void 0 : AP.delete(PDFName.of("D"));
    };
    PDFAnnotation2.prototype.getAppearances = function() {
      var AP = this.AP();
      if (!AP)
        return void 0;
      var N = AP.lookup(PDFName.of("N"), PDFDict, PDFStream);
      var R = AP.lookupMaybe(PDFName.of("R"), PDFDict, PDFStream);
      var D = AP.lookupMaybe(PDFName.of("D"), PDFDict, PDFStream);
      return { normal: N, rollover: R, down: D };
    };
    PDFAnnotation2.prototype.getFlags = function() {
      var _a2, _b2;
      return (_b2 = (_a2 = this.F()) === null || _a2 === void 0 ? void 0 : _a2.asNumber()) !== null && _b2 !== void 0 ? _b2 : 0;
    };
    PDFAnnotation2.prototype.setFlags = function(flags) {
      this.dict.set(PDFName.of("F"), PDFNumber.of(flags));
    };
    PDFAnnotation2.prototype.hasFlag = function(flag2) {
      var flags = this.getFlags();
      return (flags & flag2) !== 0;
    };
    PDFAnnotation2.prototype.setFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags | flag2);
    };
    PDFAnnotation2.prototype.clearFlag = function(flag2) {
      var flags = this.getFlags();
      this.setFlags(flags & ~flag2);
    };
    PDFAnnotation2.prototype.setFlagTo = function(flag2, enable) {
      if (enable)
        this.setFlag(flag2);
      else
        this.clearFlag(flag2);
    };
    PDFAnnotation2.fromDict = function(dict) {
      return new PDFAnnotation2(dict);
    };
    return PDFAnnotation2;
  }()
);
var AppearanceCharacteristics = (
  /** @class */
  function() {
    function AppearanceCharacteristics2(dict) {
      this.dict = dict;
    }
    AppearanceCharacteristics2.prototype.R = function() {
      var R = this.dict.lookup(PDFName.of("R"));
      if (R instanceof PDFNumber)
        return R;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.BC = function() {
      var BC = this.dict.lookup(PDFName.of("BC"));
      if (BC instanceof PDFArray)
        return BC;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.BG = function() {
      var BG = this.dict.lookup(PDFName.of("BG"));
      if (BG instanceof PDFArray)
        return BG;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.CA = function() {
      var CA = this.dict.lookup(PDFName.of("CA"));
      if (CA instanceof PDFHexString || CA instanceof PDFString)
        return CA;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.RC = function() {
      var RC = this.dict.lookup(PDFName.of("RC"));
      if (RC instanceof PDFHexString || RC instanceof PDFString)
        return RC;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.AC = function() {
      var AC = this.dict.lookup(PDFName.of("AC"));
      if (AC instanceof PDFHexString || AC instanceof PDFString)
        return AC;
      return void 0;
    };
    AppearanceCharacteristics2.prototype.getRotation = function() {
      var _a2;
      return (_a2 = this.R()) === null || _a2 === void 0 ? void 0 : _a2.asNumber();
    };
    AppearanceCharacteristics2.prototype.getBorderColor = function() {
      var BC = this.BC();
      if (!BC)
        return void 0;
      var components = [];
      for (var idx = 0, len = BC === null || BC === void 0 ? void 0 : BC.size(); idx < len; idx++) {
        var component = BC.get(idx);
        if (component instanceof PDFNumber)
          components.push(component.asNumber());
      }
      return components;
    };
    AppearanceCharacteristics2.prototype.getBackgroundColor = function() {
      var BG = this.BG();
      if (!BG)
        return void 0;
      var components = [];
      for (var idx = 0, len = BG === null || BG === void 0 ? void 0 : BG.size(); idx < len; idx++) {
        var component = BG.get(idx);
        if (component instanceof PDFNumber)
          components.push(component.asNumber());
      }
      return components;
    };
    AppearanceCharacteristics2.prototype.getCaptions = function() {
      var CA = this.CA();
      var RC = this.RC();
      var AC = this.AC();
      return {
        normal: CA === null || CA === void 0 ? void 0 : CA.decodeText(),
        rollover: RC === null || RC === void 0 ? void 0 : RC.decodeText(),
        down: AC === null || AC === void 0 ? void 0 : AC.decodeText()
      };
    };
    AppearanceCharacteristics2.prototype.setRotation = function(rotation) {
      var R = this.dict.context.obj(rotation);
      this.dict.set(PDFName.of("R"), R);
    };
    AppearanceCharacteristics2.prototype.setBorderColor = function(color) {
      var BC = this.dict.context.obj(color);
      this.dict.set(PDFName.of("BC"), BC);
    };
    AppearanceCharacteristics2.prototype.setBackgroundColor = function(color) {
      var BG = this.dict.context.obj(color);
      this.dict.set(PDFName.of("BG"), BG);
    };
    AppearanceCharacteristics2.prototype.setCaptions = function(captions) {
      var CA = PDFHexString.fromText(captions.normal);
      this.dict.set(PDFName.of("CA"), CA);
      if (captions.rollover) {
        var RC = PDFHexString.fromText(captions.rollover);
        this.dict.set(PDFName.of("RC"), RC);
      } else {
        this.dict.delete(PDFName.of("RC"));
      }
      if (captions.down) {
        var AC = PDFHexString.fromText(captions.down);
        this.dict.set(PDFName.of("AC"), AC);
      } else {
        this.dict.delete(PDFName.of("AC"));
      }
    };
    AppearanceCharacteristics2.fromDict = function(dict) {
      return new AppearanceCharacteristics2(dict);
    };
    return AppearanceCharacteristics2;
  }()
);
var PDFWidgetAnnotation = (
  /** @class */
  function(_super) {
    __extends(PDFWidgetAnnotation2, _super);
    function PDFWidgetAnnotation2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFWidgetAnnotation2.prototype.MK = function() {
      var MK = this.dict.lookup(PDFName.of("MK"));
      if (MK instanceof PDFDict)
        return MK;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.BS = function() {
      var BS = this.dict.lookup(PDFName.of("BS"));
      if (BS instanceof PDFDict)
        return BS;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.DA = function() {
      var da = this.dict.lookup(PDFName.of("DA"));
      if (da instanceof PDFString || da instanceof PDFHexString)
        return da;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.P = function() {
      var P = this.dict.get(PDFName.of("P"));
      if (P instanceof PDFRef)
        return P;
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.setP = function(page) {
      this.dict.set(PDFName.of("P"), page);
    };
    PDFWidgetAnnotation2.prototype.setDefaultAppearance = function(appearance) {
      this.dict.set(PDFName.of("DA"), PDFString.of(appearance));
    };
    PDFWidgetAnnotation2.prototype.getDefaultAppearance = function() {
      var DA = this.DA();
      if (DA instanceof PDFHexString) {
        return DA.decodeText();
      }
      return DA === null || DA === void 0 ? void 0 : DA.asString();
    };
    PDFWidgetAnnotation2.prototype.getAppearanceCharacteristics = function() {
      var MK = this.MK();
      if (MK)
        return AppearanceCharacteristics.fromDict(MK);
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.getOrCreateAppearanceCharacteristics = function() {
      var MK = this.MK();
      if (MK)
        return AppearanceCharacteristics.fromDict(MK);
      var ac = AppearanceCharacteristics.fromDict(this.dict.context.obj({}));
      this.dict.set(PDFName.of("MK"), ac.dict);
      return ac;
    };
    PDFWidgetAnnotation2.prototype.getBorderStyle = function() {
      var BS = this.BS();
      if (BS)
        return BorderStyle.fromDict(BS);
      return void 0;
    };
    PDFWidgetAnnotation2.prototype.getOrCreateBorderStyle = function() {
      var BS = this.BS();
      if (BS)
        return BorderStyle.fromDict(BS);
      var bs = BorderStyle.fromDict(this.dict.context.obj({}));
      this.dict.set(PDFName.of("BS"), bs.dict);
      return bs;
    };
    PDFWidgetAnnotation2.prototype.getOnValue = function() {
      var _a2;
      var normal = (_a2 = this.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal;
      if (normal instanceof PDFDict) {
        var keys = normal.keys();
        for (var idx = 0, len = keys.length; idx < len; idx++) {
          var key = keys[idx];
          if (key !== PDFName.of("Off"))
            return key;
        }
      }
      return void 0;
    };
    PDFWidgetAnnotation2.fromDict = function(dict) {
      return new PDFWidgetAnnotation2(dict);
    };
    PDFWidgetAnnotation2.create = function(context, parent) {
      var dict = context.obj({
        Type: "Annot",
        Subtype: "Widget",
        Rect: [0, 0, 0, 0],
        Parent: parent
      });
      return new PDFWidgetAnnotation2(dict);
    };
    return PDFWidgetAnnotation2;
  }(PDFAnnotation)
);
var PDFAcroTerminal = (
  /** @class */
  function(_super) {
    __extends(PDFAcroTerminal2, _super);
    function PDFAcroTerminal2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroTerminal2.prototype.FT = function() {
      var nameOrRef = this.getInheritableAttribute(PDFName.of("FT"));
      return this.dict.context.lookup(nameOrRef, PDFName);
    };
    PDFAcroTerminal2.prototype.getWidgets = function() {
      var kidDicts = this.Kids();
      if (!kidDicts)
        return [PDFWidgetAnnotation.fromDict(this.dict)];
      var widgets = new Array(kidDicts.size());
      for (var idx = 0, len = kidDicts.size(); idx < len; idx++) {
        var dict = kidDicts.lookup(idx, PDFDict);
        widgets[idx] = PDFWidgetAnnotation.fromDict(dict);
      }
      return widgets;
    };
    PDFAcroTerminal2.prototype.addWidget = function(ref) {
      var Kids = this.normalizedEntries().Kids;
      Kids.push(ref);
    };
    PDFAcroTerminal2.prototype.removeWidget = function(idx) {
      var kidDicts = this.Kids();
      if (!kidDicts) {
        if (idx !== 0)
          throw new IndexOutOfBoundsError(idx, 0, 0);
        this.setKids([]);
      } else {
        if (idx < 0 || idx > kidDicts.size()) {
          throw new IndexOutOfBoundsError(idx, 0, kidDicts.size());
        }
        kidDicts.remove(idx);
      }
    };
    PDFAcroTerminal2.prototype.normalizedEntries = function() {
      var Kids = this.Kids();
      if (!Kids) {
        Kids = this.dict.context.obj([this.ref]);
        this.dict.set(PDFName.of("Kids"), Kids);
      }
      return { Kids };
    };
    PDFAcroTerminal2.fromDict = function(dict, ref) {
      return new PDFAcroTerminal2(dict, ref);
    };
    return PDFAcroTerminal2;
  }(PDFAcroField)
);
var PDFAcroButton = (
  /** @class */
  function(_super) {
    __extends(PDFAcroButton2, _super);
    function PDFAcroButton2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroButton2.prototype.Opt = function() {
      return this.dict.lookupMaybe(PDFName.of("Opt"), PDFString, PDFHexString, PDFArray);
    };
    PDFAcroButton2.prototype.setOpt = function(opt) {
      this.dict.set(PDFName.of("Opt"), this.dict.context.obj(opt));
    };
    PDFAcroButton2.prototype.getExportValues = function() {
      var opt = this.Opt();
      if (!opt)
        return void 0;
      if (opt instanceof PDFString || opt instanceof PDFHexString) {
        return [opt];
      }
      var values2 = [];
      for (var idx = 0, len = opt.size(); idx < len; idx++) {
        var value = opt.lookup(idx);
        if (value instanceof PDFString || value instanceof PDFHexString) {
          values2.push(value);
        }
      }
      return values2;
    };
    PDFAcroButton2.prototype.removeExportValue = function(idx) {
      var opt = this.Opt();
      if (!opt)
        return;
      if (opt instanceof PDFString || opt instanceof PDFHexString) {
        if (idx !== 0)
          throw new IndexOutOfBoundsError(idx, 0, 0);
        this.setOpt([]);
      } else {
        if (idx < 0 || idx > opt.size()) {
          throw new IndexOutOfBoundsError(idx, 0, opt.size());
        }
        opt.remove(idx);
      }
    };
    PDFAcroButton2.prototype.normalizeExportValues = function() {
      var _a2, _b2, _c, _d;
      var exportValues = (_a2 = this.getExportValues()) !== null && _a2 !== void 0 ? _a2 : [];
      var Opt = [];
      var widgets = this.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var exportVal = (_b2 = exportValues[idx]) !== null && _b2 !== void 0 ? _b2 : PDFHexString.fromText((_d = (_c = widget.getOnValue()) === null || _c === void 0 ? void 0 : _c.decodeText()) !== null && _d !== void 0 ? _d : "");
        Opt.push(exportVal);
      }
      this.setOpt(Opt);
    };
    PDFAcroButton2.prototype.addOpt = function(opt, useExistingOptIdx) {
      var _a2;
      this.normalizeExportValues();
      var optText = opt.decodeText();
      var existingIdx;
      if (useExistingOptIdx) {
        var exportValues = (_a2 = this.getExportValues()) !== null && _a2 !== void 0 ? _a2 : [];
        for (var idx = 0, len = exportValues.length; idx < len; idx++) {
          var exportVal = exportValues[idx];
          if (exportVal.decodeText() === optText)
            existingIdx = idx;
        }
      }
      var Opt = this.Opt();
      Opt.push(opt);
      return existingIdx !== null && existingIdx !== void 0 ? existingIdx : Opt.size() - 1;
    };
    PDFAcroButton2.prototype.addWidgetWithOpt = function(widget, opt, useExistingOptIdx) {
      var optIdx = this.addOpt(opt, useExistingOptIdx);
      var apStateValue = PDFName.of(String(optIdx));
      this.addWidget(widget);
      return apStateValue;
    };
    return PDFAcroButton2;
  }(PDFAcroTerminal)
);
var PDFAcroCheckBox = (
  /** @class */
  function(_super) {
    __extends(PDFAcroCheckBox2, _super);
    function PDFAcroCheckBox2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroCheckBox2.prototype.setValue = function(value) {
      var _a2;
      var onValue = (_a2 = this.getOnValue()) !== null && _a2 !== void 0 ? _a2 : PDFName.of("Yes");
      if (value !== onValue && value !== PDFName.of("Off")) {
        throw new InvalidAcroFieldValueError();
      }
      this.dict.set(PDFName.of("V"), value);
      var widgets = this.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var state = widget.getOnValue() === value ? value : PDFName.of("Off");
        widget.setAppearanceState(state);
      }
    };
    PDFAcroCheckBox2.prototype.getValue = function() {
      var v = this.V();
      if (v instanceof PDFName)
        return v;
      return PDFName.of("Off");
    };
    PDFAcroCheckBox2.prototype.getOnValue = function() {
      var widget = this.getWidgets()[0];
      return widget === null || widget === void 0 ? void 0 : widget.getOnValue();
    };
    PDFAcroCheckBox2.fromDict = function(dict, ref) {
      return new PDFAcroCheckBox2(dict, ref);
    };
    PDFAcroCheckBox2.create = function(context) {
      var dict = context.obj({
        FT: "Btn",
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroCheckBox2(dict, ref);
    };
    return PDFAcroCheckBox2;
  }(PDFAcroButton)
);
var flag$1 = function(bitIndex) {
  return 1 << bitIndex;
};
var AcroFieldFlags;
(function(AcroFieldFlags2) {
  AcroFieldFlags2[AcroFieldFlags2["ReadOnly"] = flag$1(1 - 1)] = "ReadOnly";
  AcroFieldFlags2[AcroFieldFlags2["Required"] = flag$1(2 - 1)] = "Required";
  AcroFieldFlags2[AcroFieldFlags2["NoExport"] = flag$1(3 - 1)] = "NoExport";
})(AcroFieldFlags || (AcroFieldFlags = {}));
var AcroButtonFlags;
(function(AcroButtonFlags2) {
  AcroButtonFlags2[AcroButtonFlags2["NoToggleToOff"] = flag$1(15 - 1)] = "NoToggleToOff";
  AcroButtonFlags2[AcroButtonFlags2["Radio"] = flag$1(16 - 1)] = "Radio";
  AcroButtonFlags2[AcroButtonFlags2["PushButton"] = flag$1(17 - 1)] = "PushButton";
  AcroButtonFlags2[AcroButtonFlags2["RadiosInUnison"] = flag$1(26 - 1)] = "RadiosInUnison";
})(AcroButtonFlags || (AcroButtonFlags = {}));
var AcroTextFlags;
(function(AcroTextFlags2) {
  AcroTextFlags2[AcroTextFlags2["Multiline"] = flag$1(13 - 1)] = "Multiline";
  AcroTextFlags2[AcroTextFlags2["Password"] = flag$1(14 - 1)] = "Password";
  AcroTextFlags2[AcroTextFlags2["FileSelect"] = flag$1(21 - 1)] = "FileSelect";
  AcroTextFlags2[AcroTextFlags2["DoNotSpellCheck"] = flag$1(23 - 1)] = "DoNotSpellCheck";
  AcroTextFlags2[AcroTextFlags2["DoNotScroll"] = flag$1(24 - 1)] = "DoNotScroll";
  AcroTextFlags2[AcroTextFlags2["Comb"] = flag$1(25 - 1)] = "Comb";
  AcroTextFlags2[AcroTextFlags2["RichText"] = flag$1(26 - 1)] = "RichText";
})(AcroTextFlags || (AcroTextFlags = {}));
var AcroChoiceFlags;
(function(AcroChoiceFlags2) {
  AcroChoiceFlags2[AcroChoiceFlags2["Combo"] = flag$1(18 - 1)] = "Combo";
  AcroChoiceFlags2[AcroChoiceFlags2["Edit"] = flag$1(19 - 1)] = "Edit";
  AcroChoiceFlags2[AcroChoiceFlags2["Sort"] = flag$1(20 - 1)] = "Sort";
  AcroChoiceFlags2[AcroChoiceFlags2["MultiSelect"] = flag$1(22 - 1)] = "MultiSelect";
  AcroChoiceFlags2[AcroChoiceFlags2["DoNotSpellCheck"] = flag$1(23 - 1)] = "DoNotSpellCheck";
  AcroChoiceFlags2[AcroChoiceFlags2["CommitOnSelChange"] = flag$1(27 - 1)] = "CommitOnSelChange";
})(AcroChoiceFlags || (AcroChoiceFlags = {}));
var PDFAcroChoice = (
  /** @class */
  function(_super) {
    __extends(PDFAcroChoice2, _super);
    function PDFAcroChoice2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroChoice2.prototype.setValues = function(values2) {
      if (this.hasFlag(AcroChoiceFlags.Combo) && !this.hasFlag(AcroChoiceFlags.Edit) && !this.valuesAreValid(values2)) {
        throw new InvalidAcroFieldValueError();
      }
      if (values2.length === 0) {
        this.dict.delete(PDFName.of("V"));
      }
      if (values2.length === 1) {
        this.dict.set(PDFName.of("V"), values2[0]);
      }
      if (values2.length > 1) {
        if (!this.hasFlag(AcroChoiceFlags.MultiSelect)) {
          throw new MultiSelectValueError();
        }
        this.dict.set(PDFName.of("V"), this.dict.context.obj(values2));
      }
      this.updateSelectedIndices(values2);
    };
    PDFAcroChoice2.prototype.valuesAreValid = function(values2) {
      var options = this.getOptions();
      var _loop_1 = function(idx2, len2) {
        var val = values2[idx2].decodeText();
        if (!options.find(function(o) {
          return val === (o.display || o.value).decodeText();
        })) {
          return { value: false };
        }
      };
      for (var idx = 0, len = values2.length; idx < len; idx++) {
        var state_1 = _loop_1(idx);
        if (typeof state_1 === "object")
          return state_1.value;
      }
      return true;
    };
    PDFAcroChoice2.prototype.updateSelectedIndices = function(values2) {
      if (values2.length > 1) {
        var indices = new Array(values2.length);
        var options = this.getOptions();
        var _loop_2 = function(idx2, len2) {
          var val = values2[idx2].decodeText();
          indices[idx2] = options.findIndex(function(o) {
            return val === (o.display || o.value).decodeText();
          });
        };
        for (var idx = 0, len = values2.length; idx < len; idx++) {
          _loop_2(idx, len);
        }
        this.dict.set(PDFName.of("I"), this.dict.context.obj(indices.sort()));
      } else {
        this.dict.delete(PDFName.of("I"));
      }
    };
    PDFAcroChoice2.prototype.getValues = function() {
      var v = this.V();
      if (v instanceof PDFString || v instanceof PDFHexString)
        return [v];
      if (v instanceof PDFArray) {
        var values2 = [];
        for (var idx = 0, len = v.size(); idx < len; idx++) {
          var value = v.lookup(idx);
          if (value instanceof PDFString || value instanceof PDFHexString) {
            values2.push(value);
          }
        }
        return values2;
      }
      return [];
    };
    PDFAcroChoice2.prototype.Opt = function() {
      return this.dict.lookupMaybe(PDFName.of("Opt"), PDFString, PDFHexString, PDFArray);
    };
    PDFAcroChoice2.prototype.setOptions = function(options) {
      var newOpt = new Array(options.length);
      for (var idx = 0, len = options.length; idx < len; idx++) {
        var _a2 = options[idx], value = _a2.value, display = _a2.display;
        newOpt[idx] = this.dict.context.obj([value, display || value]);
      }
      this.dict.set(PDFName.of("Opt"), this.dict.context.obj(newOpt));
    };
    PDFAcroChoice2.prototype.getOptions = function() {
      var Opt = this.Opt();
      if (Opt instanceof PDFString || Opt instanceof PDFHexString) {
        return [{ value: Opt, display: Opt }];
      }
      if (Opt instanceof PDFArray) {
        var res = [];
        for (var idx = 0, len = Opt.size(); idx < len; idx++) {
          var item = Opt.lookup(idx);
          if (item instanceof PDFString || item instanceof PDFHexString) {
            res.push({ value: item, display: item });
          }
          if (item instanceof PDFArray) {
            if (item.size() > 0) {
              var first = item.lookup(0, PDFString, PDFHexString);
              var second = item.lookupMaybe(1, PDFString, PDFHexString);
              res.push({ value: first, display: second || first });
            }
          }
        }
        return res;
      }
      return [];
    };
    return PDFAcroChoice2;
  }(PDFAcroTerminal)
);
var PDFAcroComboBox = (
  /** @class */
  function(_super) {
    __extends(PDFAcroComboBox2, _super);
    function PDFAcroComboBox2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroComboBox2.fromDict = function(dict, ref) {
      return new PDFAcroComboBox2(dict, ref);
    };
    PDFAcroComboBox2.create = function(context) {
      var dict = context.obj({
        FT: "Ch",
        Ff: AcroChoiceFlags.Combo,
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroComboBox2(dict, ref);
    };
    return PDFAcroComboBox2;
  }(PDFAcroChoice)
);
var PDFAcroNonTerminal = (
  /** @class */
  function(_super) {
    __extends(PDFAcroNonTerminal2, _super);
    function PDFAcroNonTerminal2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroNonTerminal2.prototype.addField = function(field) {
      var Kids = this.normalizedEntries().Kids;
      Kids === null || Kids === void 0 ? void 0 : Kids.push(field);
    };
    PDFAcroNonTerminal2.prototype.normalizedEntries = function() {
      var Kids = this.Kids();
      if (!Kids) {
        Kids = this.dict.context.obj([]);
        this.dict.set(PDFName.of("Kids"), Kids);
      }
      return { Kids };
    };
    PDFAcroNonTerminal2.fromDict = function(dict, ref) {
      return new PDFAcroNonTerminal2(dict, ref);
    };
    PDFAcroNonTerminal2.create = function(context) {
      var dict = context.obj({});
      var ref = context.register(dict);
      return new PDFAcroNonTerminal2(dict, ref);
    };
    return PDFAcroNonTerminal2;
  }(PDFAcroField)
);
var PDFAcroSignature = (
  /** @class */
  function(_super) {
    __extends(PDFAcroSignature2, _super);
    function PDFAcroSignature2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroSignature2.fromDict = function(dict, ref) {
      return new PDFAcroSignature2(dict, ref);
    };
    return PDFAcroSignature2;
  }(PDFAcroTerminal)
);
var PDFAcroText = (
  /** @class */
  function(_super) {
    __extends(PDFAcroText2, _super);
    function PDFAcroText2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroText2.prototype.MaxLen = function() {
      var maxLen = this.dict.lookup(PDFName.of("MaxLen"));
      if (maxLen instanceof PDFNumber)
        return maxLen;
      return void 0;
    };
    PDFAcroText2.prototype.Q = function() {
      var q = this.dict.lookup(PDFName.of("Q"));
      if (q instanceof PDFNumber)
        return q;
      return void 0;
    };
    PDFAcroText2.prototype.setMaxLength = function(maxLength) {
      this.dict.set(PDFName.of("MaxLen"), PDFNumber.of(maxLength));
    };
    PDFAcroText2.prototype.removeMaxLength = function() {
      this.dict.delete(PDFName.of("MaxLen"));
    };
    PDFAcroText2.prototype.getMaxLength = function() {
      var _a2;
      return (_a2 = this.MaxLen()) === null || _a2 === void 0 ? void 0 : _a2.asNumber();
    };
    PDFAcroText2.prototype.setQuadding = function(quadding) {
      this.dict.set(PDFName.of("Q"), PDFNumber.of(quadding));
    };
    PDFAcroText2.prototype.getQuadding = function() {
      var _a2;
      return (_a2 = this.Q()) === null || _a2 === void 0 ? void 0 : _a2.asNumber();
    };
    PDFAcroText2.prototype.setValue = function(value) {
      this.dict.set(PDFName.of("V"), value);
    };
    PDFAcroText2.prototype.removeValue = function() {
      this.dict.delete(PDFName.of("V"));
    };
    PDFAcroText2.prototype.getValue = function() {
      var v = this.V();
      if (v instanceof PDFString || v instanceof PDFHexString)
        return v;
      return void 0;
    };
    PDFAcroText2.fromDict = function(dict, ref) {
      return new PDFAcroText2(dict, ref);
    };
    PDFAcroText2.create = function(context) {
      var dict = context.obj({
        FT: "Tx",
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroText2(dict, ref);
    };
    return PDFAcroText2;
  }(PDFAcroTerminal)
);
var PDFAcroPushButton = (
  /** @class */
  function(_super) {
    __extends(PDFAcroPushButton2, _super);
    function PDFAcroPushButton2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroPushButton2.fromDict = function(dict, ref) {
      return new PDFAcroPushButton2(dict, ref);
    };
    PDFAcroPushButton2.create = function(context) {
      var dict = context.obj({
        FT: "Btn",
        Ff: AcroButtonFlags.PushButton,
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroPushButton2(dict, ref);
    };
    return PDFAcroPushButton2;
  }(PDFAcroButton)
);
var PDFAcroRadioButton = (
  /** @class */
  function(_super) {
    __extends(PDFAcroRadioButton2, _super);
    function PDFAcroRadioButton2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroRadioButton2.prototype.setValue = function(value) {
      var onValues = this.getOnValues();
      if (!onValues.includes(value) && value !== PDFName.of("Off")) {
        throw new InvalidAcroFieldValueError();
      }
      this.dict.set(PDFName.of("V"), value);
      var widgets = this.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var state = widget.getOnValue() === value ? value : PDFName.of("Off");
        widget.setAppearanceState(state);
      }
    };
    PDFAcroRadioButton2.prototype.getValue = function() {
      var v = this.V();
      if (v instanceof PDFName)
        return v;
      return PDFName.of("Off");
    };
    PDFAcroRadioButton2.prototype.getOnValues = function() {
      var widgets = this.getWidgets();
      var onValues = [];
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var onValue = widgets[idx].getOnValue();
        if (onValue)
          onValues.push(onValue);
      }
      return onValues;
    };
    PDFAcroRadioButton2.fromDict = function(dict, ref) {
      return new PDFAcroRadioButton2(dict, ref);
    };
    PDFAcroRadioButton2.create = function(context) {
      var dict = context.obj({
        FT: "Btn",
        Ff: AcroButtonFlags.Radio,
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroRadioButton2(dict, ref);
    };
    return PDFAcroRadioButton2;
  }(PDFAcroButton)
);
var PDFAcroListBox = (
  /** @class */
  function(_super) {
    __extends(PDFAcroListBox2, _super);
    function PDFAcroListBox2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFAcroListBox2.fromDict = function(dict, ref) {
      return new PDFAcroListBox2(dict, ref);
    };
    PDFAcroListBox2.create = function(context) {
      var dict = context.obj({
        FT: "Ch",
        Kids: []
      });
      var ref = context.register(dict);
      return new PDFAcroListBox2(dict, ref);
    };
    return PDFAcroListBox2;
  }(PDFAcroChoice)
);
var createPDFAcroFields = function(kidDicts) {
  if (!kidDicts)
    return [];
  var kids = [];
  for (var idx = 0, len = kidDicts.size(); idx < len; idx++) {
    var ref = kidDicts.get(idx);
    var dict = kidDicts.lookup(idx);
    if (ref instanceof PDFRef && dict instanceof PDFDict) {
      kids.push([createPDFAcroField(dict, ref), ref]);
    }
  }
  return kids;
};
var createPDFAcroField = function(dict, ref) {
  var isNonTerminal = isNonTerminalAcroField(dict);
  if (isNonTerminal)
    return PDFAcroNonTerminal.fromDict(dict, ref);
  return createPDFAcroTerminal(dict, ref);
};
var isNonTerminalAcroField = function(dict) {
  var kids = dict.lookup(PDFName.of("Kids"));
  if (kids instanceof PDFArray) {
    for (var idx = 0, len = kids.size(); idx < len; idx++) {
      var kid = kids.lookup(idx);
      var kidIsField = kid instanceof PDFDict && kid.has(PDFName.of("T"));
      if (kidIsField)
        return true;
    }
  }
  return false;
};
var createPDFAcroTerminal = function(dict, ref) {
  var ftNameOrRef = getInheritableAttribute(dict, PDFName.of("FT"));
  var type = dict.context.lookup(ftNameOrRef, PDFName);
  if (type === PDFName.of("Btn"))
    return createPDFAcroButton(dict, ref);
  if (type === PDFName.of("Ch"))
    return createPDFAcroChoice(dict, ref);
  if (type === PDFName.of("Tx"))
    return PDFAcroText.fromDict(dict, ref);
  if (type === PDFName.of("Sig"))
    return PDFAcroSignature.fromDict(dict, ref);
  return PDFAcroTerminal.fromDict(dict, ref);
};
var createPDFAcroButton = function(dict, ref) {
  var _a2;
  var ffNumberOrRef = getInheritableAttribute(dict, PDFName.of("Ff"));
  var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber);
  var flags = (_a2 = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a2 !== void 0 ? _a2 : 0;
  if (flagIsSet(flags, AcroButtonFlags.PushButton)) {
    return PDFAcroPushButton.fromDict(dict, ref);
  } else if (flagIsSet(flags, AcroButtonFlags.Radio)) {
    return PDFAcroRadioButton.fromDict(dict, ref);
  } else {
    return PDFAcroCheckBox.fromDict(dict, ref);
  }
};
var createPDFAcroChoice = function(dict, ref) {
  var _a2;
  var ffNumberOrRef = getInheritableAttribute(dict, PDFName.of("Ff"));
  var ffNumber = dict.context.lookupMaybe(ffNumberOrRef, PDFNumber);
  var flags = (_a2 = ffNumber === null || ffNumber === void 0 ? void 0 : ffNumber.asNumber()) !== null && _a2 !== void 0 ? _a2 : 0;
  if (flagIsSet(flags, AcroChoiceFlags.Combo)) {
    return PDFAcroComboBox.fromDict(dict, ref);
  } else {
    return PDFAcroListBox.fromDict(dict, ref);
  }
};
var flagIsSet = function(flags, flag2) {
  return (flags & flag2) !== 0;
};
var getInheritableAttribute = function(startNode, name) {
  var attribute;
  ascend(startNode, function(node) {
    if (!attribute)
      attribute = node.get(name);
  });
  return attribute;
};
var ascend = function(startNode, visitor) {
  visitor(startNode);
  var Parent = startNode.lookupMaybe(PDFName.of("Parent"), PDFDict);
  if (Parent)
    ascend(Parent, visitor);
};
var PDFAcroForm = (
  /** @class */
  function() {
    function PDFAcroForm2(dict) {
      this.dict = dict;
    }
    PDFAcroForm2.prototype.Fields = function() {
      var fields = this.dict.lookup(PDFName.of("Fields"));
      if (fields instanceof PDFArray)
        return fields;
      return void 0;
    };
    PDFAcroForm2.prototype.getFields = function() {
      var Fields = this.normalizedEntries().Fields;
      var fields = new Array(Fields.size());
      for (var idx = 0, len = Fields.size(); idx < len; idx++) {
        var ref = Fields.get(idx);
        var dict = Fields.lookup(idx, PDFDict);
        fields[idx] = [createPDFAcroField(dict, ref), ref];
      }
      return fields;
    };
    PDFAcroForm2.prototype.getAllFields = function() {
      var allFields = [];
      var pushFields = function(fields) {
        if (!fields)
          return;
        for (var idx = 0, len = fields.length; idx < len; idx++) {
          var field = fields[idx];
          allFields.push(field);
          var fieldModel = field[0];
          if (fieldModel instanceof PDFAcroNonTerminal) {
            pushFields(createPDFAcroFields(fieldModel.Kids()));
          }
        }
      };
      pushFields(this.getFields());
      return allFields;
    };
    PDFAcroForm2.prototype.addField = function(field) {
      var Fields = this.normalizedEntries().Fields;
      Fields === null || Fields === void 0 ? void 0 : Fields.push(field);
    };
    PDFAcroForm2.prototype.removeField = function(field) {
      var parent = field.getParent();
      var fields = parent === void 0 ? this.normalizedEntries().Fields : parent.Kids();
      var index = fields === null || fields === void 0 ? void 0 : fields.indexOf(field.ref);
      if (fields === void 0 || index === void 0) {
        throw new Error("Tried to remove inexistent field " + field.getFullyQualifiedName());
      }
      fields.remove(index);
      if (parent !== void 0 && fields.size() === 0) {
        this.removeField(parent);
      }
    };
    PDFAcroForm2.prototype.normalizedEntries = function() {
      var Fields = this.Fields();
      if (!Fields) {
        Fields = this.dict.context.obj([]);
        this.dict.set(PDFName.of("Fields"), Fields);
      }
      return { Fields };
    };
    PDFAcroForm2.fromDict = function(dict) {
      return new PDFAcroForm2(dict);
    };
    PDFAcroForm2.create = function(context) {
      var dict = context.obj({ Fields: [] });
      return new PDFAcroForm2(dict);
    };
    return PDFAcroForm2;
  }()
);
var PDFCatalog = (
  /** @class */
  function(_super) {
    __extends(PDFCatalog2, _super);
    function PDFCatalog2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFCatalog2.prototype.Pages = function() {
      return this.lookup(PDFName.of("Pages"), PDFDict);
    };
    PDFCatalog2.prototype.AcroForm = function() {
      return this.lookupMaybe(PDFName.of("AcroForm"), PDFDict);
    };
    PDFCatalog2.prototype.getAcroForm = function() {
      var dict = this.AcroForm();
      if (!dict)
        return void 0;
      return PDFAcroForm.fromDict(dict);
    };
    PDFCatalog2.prototype.getOrCreateAcroForm = function() {
      var acroForm = this.getAcroForm();
      if (!acroForm) {
        acroForm = PDFAcroForm.create(this.context);
        var acroFormRef = this.context.register(acroForm.dict);
        this.set(PDFName.of("AcroForm"), acroFormRef);
      }
      return acroForm;
    };
    PDFCatalog2.prototype.ViewerPreferences = function() {
      return this.lookupMaybe(PDFName.of("ViewerPreferences"), PDFDict);
    };
    PDFCatalog2.prototype.getViewerPreferences = function() {
      var dict = this.ViewerPreferences();
      if (!dict)
        return void 0;
      return ViewerPreferences.fromDict(dict);
    };
    PDFCatalog2.prototype.getOrCreateViewerPreferences = function() {
      var viewerPrefs = this.getViewerPreferences();
      if (!viewerPrefs) {
        viewerPrefs = ViewerPreferences.create(this.context);
        var viewerPrefsRef = this.context.register(viewerPrefs.dict);
        this.set(PDFName.of("ViewerPreferences"), viewerPrefsRef);
      }
      return viewerPrefs;
    };
    PDFCatalog2.prototype.insertLeafNode = function(leafRef, index) {
      var pagesRef = this.get(PDFName.of("Pages"));
      var maybeParentRef = this.Pages().insertLeafNode(leafRef, index);
      return maybeParentRef || pagesRef;
    };
    PDFCatalog2.prototype.removeLeafNode = function(index) {
      this.Pages().removeLeafNode(index);
    };
    PDFCatalog2.withContextAndPages = function(context, pages) {
      var dict = /* @__PURE__ */ new Map();
      dict.set(PDFName.of("Type"), PDFName.of("Catalog"));
      dict.set(PDFName.of("Pages"), pages);
      return new PDFCatalog2(dict, context);
    };
    PDFCatalog2.fromMapWithContext = function(map, context) {
      return new PDFCatalog2(map, context);
    };
    return PDFCatalog2;
  }(PDFDict)
);
var PDFPageTree = (
  /** @class */
  function(_super) {
    __extends(PDFPageTree2, _super);
    function PDFPageTree2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFPageTree2.prototype.Parent = function() {
      return this.lookup(PDFName.of("Parent"));
    };
    PDFPageTree2.prototype.Kids = function() {
      return this.lookup(PDFName.of("Kids"), PDFArray);
    };
    PDFPageTree2.prototype.Count = function() {
      return this.lookup(PDFName.of("Count"), PDFNumber);
    };
    PDFPageTree2.prototype.pushTreeNode = function(treeRef) {
      var Kids = this.Kids();
      Kids.push(treeRef);
    };
    PDFPageTree2.prototype.pushLeafNode = function(leafRef) {
      var Kids = this.Kids();
      this.insertLeafKid(Kids.size(), leafRef);
    };
    PDFPageTree2.prototype.insertLeafNode = function(leafRef, targetIndex) {
      var Kids = this.Kids();
      var Count = this.Count().asNumber();
      if (targetIndex > Count) {
        throw new InvalidTargetIndexError(targetIndex, Count);
      }
      var leafsRemainingUntilTarget = targetIndex;
      for (var idx = 0, len = Kids.size(); idx < len; idx++) {
        if (leafsRemainingUntilTarget === 0) {
          this.insertLeafKid(idx, leafRef);
          return void 0;
        }
        var kidRef = Kids.get(idx);
        var kid = this.context.lookup(kidRef);
        if (kid instanceof PDFPageTree2) {
          if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
            return kid.insertLeafNode(leafRef, leafsRemainingUntilTarget) || kidRef;
          } else {
            leafsRemainingUntilTarget -= kid.Count().asNumber();
          }
        }
        if (kid instanceof PDFPageLeaf) {
          leafsRemainingUntilTarget -= 1;
        }
      }
      if (leafsRemainingUntilTarget === 0) {
        this.insertLeafKid(Kids.size(), leafRef);
        return void 0;
      }
      throw new CorruptPageTreeError(targetIndex, "insertLeafNode");
    };
    PDFPageTree2.prototype.removeLeafNode = function(targetIndex, prune) {
      if (prune === void 0) {
        prune = true;
      }
      var Kids = this.Kids();
      var Count = this.Count().asNumber();
      if (targetIndex >= Count) {
        throw new InvalidTargetIndexError(targetIndex, Count);
      }
      var leafsRemainingUntilTarget = targetIndex;
      for (var idx = 0, len = Kids.size(); idx < len; idx++) {
        var kidRef = Kids.get(idx);
        var kid = this.context.lookup(kidRef);
        if (kid instanceof PDFPageTree2) {
          if (kid.Count().asNumber() > leafsRemainingUntilTarget) {
            kid.removeLeafNode(leafsRemainingUntilTarget, prune);
            if (prune && kid.Kids().size() === 0)
              Kids.remove(idx);
            return;
          } else {
            leafsRemainingUntilTarget -= kid.Count().asNumber();
          }
        }
        if (kid instanceof PDFPageLeaf) {
          if (leafsRemainingUntilTarget === 0) {
            this.removeKid(idx);
            return;
          } else {
            leafsRemainingUntilTarget -= 1;
          }
        }
      }
      throw new CorruptPageTreeError(targetIndex, "removeLeafNode");
    };
    PDFPageTree2.prototype.ascend = function(visitor) {
      visitor(this);
      var Parent = this.Parent();
      if (Parent)
        Parent.ascend(visitor);
    };
    PDFPageTree2.prototype.traverse = function(visitor) {
      var Kids = this.Kids();
      for (var idx = 0, len = Kids.size(); idx < len; idx++) {
        var kidRef = Kids.get(idx);
        var kid = this.context.lookup(kidRef);
        if (kid instanceof PDFPageTree2)
          kid.traverse(visitor);
        visitor(kid, kidRef);
      }
    };
    PDFPageTree2.prototype.insertLeafKid = function(kidIdx, leafRef) {
      var Kids = this.Kids();
      this.ascend(function(node) {
        var newCount = node.Count().asNumber() + 1;
        node.set(PDFName.of("Count"), PDFNumber.of(newCount));
      });
      Kids.insert(kidIdx, leafRef);
    };
    PDFPageTree2.prototype.removeKid = function(kidIdx) {
      var Kids = this.Kids();
      var kid = Kids.lookup(kidIdx);
      if (kid instanceof PDFPageLeaf) {
        this.ascend(function(node) {
          var newCount = node.Count().asNumber() - 1;
          node.set(PDFName.of("Count"), PDFNumber.of(newCount));
        });
      }
      Kids.remove(kidIdx);
    };
    PDFPageTree2.withContext = function(context, parent) {
      var dict = /* @__PURE__ */ new Map();
      dict.set(PDFName.of("Type"), PDFName.of("Pages"));
      dict.set(PDFName.of("Kids"), context.obj([]));
      dict.set(PDFName.of("Count"), context.obj(0));
      if (parent)
        dict.set(PDFName.of("Parent"), parent);
      return new PDFPageTree2(dict, context);
    };
    PDFPageTree2.fromMapWithContext = function(map, context) {
      return new PDFPageTree2(map, context);
    };
    return PDFPageTree2;
  }(PDFDict)
);
var IsDigit = new Uint8Array(256);
IsDigit[CharCodes$1.Zero] = 1;
IsDigit[CharCodes$1.One] = 1;
IsDigit[CharCodes$1.Two] = 1;
IsDigit[CharCodes$1.Three] = 1;
IsDigit[CharCodes$1.Four] = 1;
IsDigit[CharCodes$1.Five] = 1;
IsDigit[CharCodes$1.Six] = 1;
IsDigit[CharCodes$1.Seven] = 1;
IsDigit[CharCodes$1.Eight] = 1;
IsDigit[CharCodes$1.Nine] = 1;
var IsNumericPrefix = new Uint8Array(256);
IsNumericPrefix[CharCodes$1.Period] = 1;
IsNumericPrefix[CharCodes$1.Plus] = 1;
IsNumericPrefix[CharCodes$1.Minus] = 1;
var IsNumeric = new Uint8Array(256);
for (var idx = 0, len = 256; idx < len; idx++) {
  IsNumeric[idx] = IsDigit[idx] || IsNumericPrefix[idx] ? 1 : 0;
}
var Newline$1 = CharCodes$1.Newline, CarriageReturn$1 = CharCodes$1.CarriageReturn;
var BaseParser = (
  /** @class */
  function() {
    function BaseParser2(bytes, capNumbers) {
      if (capNumbers === void 0) {
        capNumbers = false;
      }
      this.bytes = bytes;
      this.capNumbers = capNumbers;
    }
    BaseParser2.prototype.parseRawInt = function() {
      var value = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (!IsDigit[byte])
          break;
        value += charFromCode(this.bytes.next());
      }
      var numberValue = Number(value);
      if (!value || !isFinite(numberValue)) {
        throw new NumberParsingError(this.bytes.position(), value);
      }
      return numberValue;
    };
    BaseParser2.prototype.parseRawNumber = function() {
      var value = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (!IsNumeric[byte])
          break;
        value += charFromCode(this.bytes.next());
        if (byte === CharCodes$1.Period)
          break;
      }
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (!IsDigit[byte])
          break;
        value += charFromCode(this.bytes.next());
      }
      var numberValue = Number(value);
      if (!value || !isFinite(numberValue)) {
        throw new NumberParsingError(this.bytes.position(), value);
      }
      if (numberValue > Number.MAX_SAFE_INTEGER) {
        if (this.capNumbers) {
          var msg = "Parsed number that is too large for some PDF readers: " + value + ", using Number.MAX_SAFE_INTEGER instead.";
          console.warn(msg);
          return Number.MAX_SAFE_INTEGER;
        } else {
          var msg = "Parsed number that is too large for some PDF readers: " + value + ", not capping.";
          console.warn(msg);
        }
      }
      return numberValue;
    };
    BaseParser2.prototype.skipWhitespace = function() {
      while (!this.bytes.done() && IsWhitespace[this.bytes.peek()]) {
        this.bytes.next();
      }
    };
    BaseParser2.prototype.skipLine = function() {
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (byte === Newline$1 || byte === CarriageReturn$1)
          return;
        this.bytes.next();
      }
    };
    BaseParser2.prototype.skipComment = function() {
      if (this.bytes.peek() !== CharCodes$1.Percent)
        return false;
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (byte === Newline$1 || byte === CarriageReturn$1)
          return true;
        this.bytes.next();
      }
      return true;
    };
    BaseParser2.prototype.skipWhitespaceAndComments = function() {
      this.skipWhitespace();
      while (this.skipComment())
        this.skipWhitespace();
    };
    BaseParser2.prototype.matchKeyword = function(keyword) {
      var initialOffset = this.bytes.offset();
      for (var idx = 0, len = keyword.length; idx < len; idx++) {
        if (this.bytes.done() || this.bytes.next() !== keyword[idx]) {
          this.bytes.moveTo(initialOffset);
          return false;
        }
      }
      return true;
    };
    return BaseParser2;
  }()
);
var ByteStream = (
  /** @class */
  function() {
    function ByteStream2(bytes) {
      this.idx = 0;
      this.line = 0;
      this.column = 0;
      this.bytes = bytes;
      this.length = this.bytes.length;
    }
    ByteStream2.prototype.moveTo = function(offset) {
      this.idx = offset;
    };
    ByteStream2.prototype.next = function() {
      var byte = this.bytes[this.idx++];
      if (byte === CharCodes$1.Newline) {
        this.line += 1;
        this.column = 0;
      } else {
        this.column += 1;
      }
      return byte;
    };
    ByteStream2.prototype.assertNext = function(expected) {
      if (this.peek() !== expected) {
        throw new NextByteAssertionError(this.position(), expected, this.peek());
      }
      return this.next();
    };
    ByteStream2.prototype.peek = function() {
      return this.bytes[this.idx];
    };
    ByteStream2.prototype.peekAhead = function(steps) {
      return this.bytes[this.idx + steps];
    };
    ByteStream2.prototype.peekAt = function(offset) {
      return this.bytes[offset];
    };
    ByteStream2.prototype.done = function() {
      return this.idx >= this.length;
    };
    ByteStream2.prototype.offset = function() {
      return this.idx;
    };
    ByteStream2.prototype.slice = function(start, end) {
      return this.bytes.slice(start, end);
    };
    ByteStream2.prototype.position = function() {
      return { line: this.line, column: this.column, offset: this.idx };
    };
    ByteStream2.of = function(bytes) {
      return new ByteStream2(bytes);
    };
    ByteStream2.fromPDFRawStream = function(rawStream) {
      return ByteStream2.of(decodePDFRawStream(rawStream).decode());
    };
    return ByteStream2;
  }()
);
var Space = CharCodes$1.Space, CarriageReturn = CharCodes$1.CarriageReturn, Newline = CharCodes$1.Newline;
var stream = [
  CharCodes$1.s,
  CharCodes$1.t,
  CharCodes$1.r,
  CharCodes$1.e,
  CharCodes$1.a,
  CharCodes$1.m
];
var endstream = [
  CharCodes$1.e,
  CharCodes$1.n,
  CharCodes$1.d,
  CharCodes$1.s,
  CharCodes$1.t,
  CharCodes$1.r,
  CharCodes$1.e,
  CharCodes$1.a,
  CharCodes$1.m
];
var Keywords = {
  header: [
    CharCodes$1.Percent,
    CharCodes$1.P,
    CharCodes$1.D,
    CharCodes$1.F,
    CharCodes$1.Dash
  ],
  eof: [
    CharCodes$1.Percent,
    CharCodes$1.Percent,
    CharCodes$1.E,
    CharCodes$1.O,
    CharCodes$1.F
  ],
  obj: [CharCodes$1.o, CharCodes$1.b, CharCodes$1.j],
  endobj: [
    CharCodes$1.e,
    CharCodes$1.n,
    CharCodes$1.d,
    CharCodes$1.o,
    CharCodes$1.b,
    CharCodes$1.j
  ],
  xref: [CharCodes$1.x, CharCodes$1.r, CharCodes$1.e, CharCodes$1.f],
  trailer: [
    CharCodes$1.t,
    CharCodes$1.r,
    CharCodes$1.a,
    CharCodes$1.i,
    CharCodes$1.l,
    CharCodes$1.e,
    CharCodes$1.r
  ],
  startxref: [
    CharCodes$1.s,
    CharCodes$1.t,
    CharCodes$1.a,
    CharCodes$1.r,
    CharCodes$1.t,
    CharCodes$1.x,
    CharCodes$1.r,
    CharCodes$1.e,
    CharCodes$1.f
  ],
  true: [CharCodes$1.t, CharCodes$1.r, CharCodes$1.u, CharCodes$1.e],
  false: [CharCodes$1.f, CharCodes$1.a, CharCodes$1.l, CharCodes$1.s, CharCodes$1.e],
  null: [CharCodes$1.n, CharCodes$1.u, CharCodes$1.l, CharCodes$1.l],
  stream,
  streamEOF1: __spreadArrays(stream, [Space, CarriageReturn, Newline]),
  streamEOF2: __spreadArrays(stream, [CarriageReturn, Newline]),
  streamEOF3: __spreadArrays(stream, [CarriageReturn]),
  streamEOF4: __spreadArrays(stream, [Newline]),
  endstream,
  EOF1endstream: __spreadArrays([CarriageReturn, Newline], endstream),
  EOF2endstream: __spreadArrays([CarriageReturn], endstream),
  EOF3endstream: __spreadArrays([Newline], endstream)
};
var PDFObjectParser = (
  /** @class */
  function(_super) {
    __extends(PDFObjectParser2, _super);
    function PDFObjectParser2(byteStream, context, capNumbers) {
      if (capNumbers === void 0) {
        capNumbers = false;
      }
      var _this = _super.call(this, byteStream, capNumbers) || this;
      _this.context = context;
      return _this;
    }
    PDFObjectParser2.prototype.parseObject = function() {
      this.skipWhitespaceAndComments();
      if (this.matchKeyword(Keywords.true))
        return PDFBool.True;
      if (this.matchKeyword(Keywords.false))
        return PDFBool.False;
      if (this.matchKeyword(Keywords.null))
        return PDFNull$1;
      var byte = this.bytes.peek();
      if (byte === CharCodes$1.LessThan && this.bytes.peekAhead(1) === CharCodes$1.LessThan) {
        return this.parseDictOrStream();
      }
      if (byte === CharCodes$1.LessThan)
        return this.parseHexString();
      if (byte === CharCodes$1.LeftParen)
        return this.parseString();
      if (byte === CharCodes$1.ForwardSlash)
        return this.parseName();
      if (byte === CharCodes$1.LeftSquareBracket)
        return this.parseArray();
      if (IsNumeric[byte])
        return this.parseNumberOrRef();
      throw new PDFObjectParsingError(this.bytes.position(), byte);
    };
    PDFObjectParser2.prototype.parseNumberOrRef = function() {
      var firstNum = this.parseRawNumber();
      this.skipWhitespaceAndComments();
      var lookaheadStart = this.bytes.offset();
      if (IsDigit[this.bytes.peek()]) {
        var secondNum = this.parseRawNumber();
        this.skipWhitespaceAndComments();
        if (this.bytes.peek() === CharCodes$1.R) {
          this.bytes.assertNext(CharCodes$1.R);
          return PDFRef.of(firstNum, secondNum);
        }
      }
      this.bytes.moveTo(lookaheadStart);
      return PDFNumber.of(firstNum);
    };
    PDFObjectParser2.prototype.parseHexString = function() {
      var value = "";
      this.bytes.assertNext(CharCodes$1.LessThan);
      while (!this.bytes.done() && this.bytes.peek() !== CharCodes$1.GreaterThan) {
        value += charFromCode(this.bytes.next());
      }
      this.bytes.assertNext(CharCodes$1.GreaterThan);
      return PDFHexString.of(value);
    };
    PDFObjectParser2.prototype.parseString = function() {
      var nestingLvl = 0;
      var isEscaped = false;
      var value = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.next();
        value += charFromCode(byte);
        if (!isEscaped) {
          if (byte === CharCodes$1.LeftParen)
            nestingLvl += 1;
          if (byte === CharCodes$1.RightParen)
            nestingLvl -= 1;
        }
        if (byte === CharCodes$1.BackSlash) {
          isEscaped = !isEscaped;
        } else if (isEscaped) {
          isEscaped = false;
        }
        if (nestingLvl === 0) {
          return PDFString.of(value.substring(1, value.length - 1));
        }
      }
      throw new UnbalancedParenthesisError(this.bytes.position());
    };
    PDFObjectParser2.prototype.parseName = function() {
      this.bytes.assertNext(CharCodes$1.ForwardSlash);
      var name = "";
      while (!this.bytes.done()) {
        var byte = this.bytes.peek();
        if (IsWhitespace[byte] || IsDelimiter[byte])
          break;
        name += charFromCode(byte);
        this.bytes.next();
      }
      return PDFName.of(name);
    };
    PDFObjectParser2.prototype.parseArray = function() {
      this.bytes.assertNext(CharCodes$1.LeftSquareBracket);
      this.skipWhitespaceAndComments();
      var pdfArray = PDFArray.withContext(this.context);
      while (this.bytes.peek() !== CharCodes$1.RightSquareBracket) {
        var element = this.parseObject();
        pdfArray.push(element);
        this.skipWhitespaceAndComments();
      }
      this.bytes.assertNext(CharCodes$1.RightSquareBracket);
      return pdfArray;
    };
    PDFObjectParser2.prototype.parseDict = function() {
      this.bytes.assertNext(CharCodes$1.LessThan);
      this.bytes.assertNext(CharCodes$1.LessThan);
      this.skipWhitespaceAndComments();
      var dict = /* @__PURE__ */ new Map();
      while (!this.bytes.done() && this.bytes.peek() !== CharCodes$1.GreaterThan && this.bytes.peekAhead(1) !== CharCodes$1.GreaterThan) {
        var key = this.parseName();
        var value = this.parseObject();
        dict.set(key, value);
        this.skipWhitespaceAndComments();
      }
      this.skipWhitespaceAndComments();
      this.bytes.assertNext(CharCodes$1.GreaterThan);
      this.bytes.assertNext(CharCodes$1.GreaterThan);
      var Type2 = dict.get(PDFName.of("Type"));
      if (Type2 === PDFName.of("Catalog")) {
        return PDFCatalog.fromMapWithContext(dict, this.context);
      } else if (Type2 === PDFName.of("Pages")) {
        return PDFPageTree.fromMapWithContext(dict, this.context);
      } else if (Type2 === PDFName.of("Page")) {
        return PDFPageLeaf.fromMapWithContext(dict, this.context);
      } else {
        return PDFDict.fromMapWithContext(dict, this.context);
      }
    };
    PDFObjectParser2.prototype.parseDictOrStream = function() {
      var startPos = this.bytes.position();
      var dict = this.parseDict();
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.streamEOF1) && !this.matchKeyword(Keywords.streamEOF2) && !this.matchKeyword(Keywords.streamEOF3) && !this.matchKeyword(Keywords.streamEOF4) && !this.matchKeyword(Keywords.stream)) {
        return dict;
      }
      var start = this.bytes.offset();
      var end;
      var Length = dict.get(PDFName.of("Length"));
      if (Length instanceof PDFNumber) {
        end = start + Length.asNumber();
        this.bytes.moveTo(end);
        this.skipWhitespaceAndComments();
        if (!this.matchKeyword(Keywords.endstream)) {
          this.bytes.moveTo(start);
          end = this.findEndOfStreamFallback(startPos);
        }
      } else {
        end = this.findEndOfStreamFallback(startPos);
      }
      var contents = this.bytes.slice(start, end);
      return PDFRawStream.of(dict, contents);
    };
    PDFObjectParser2.prototype.findEndOfStreamFallback = function(startPos) {
      var nestingLvl = 1;
      var end = this.bytes.offset();
      while (!this.bytes.done()) {
        end = this.bytes.offset();
        if (this.matchKeyword(Keywords.stream)) {
          nestingLvl += 1;
        } else if (this.matchKeyword(Keywords.EOF1endstream) || this.matchKeyword(Keywords.EOF2endstream) || this.matchKeyword(Keywords.EOF3endstream) || this.matchKeyword(Keywords.endstream)) {
          nestingLvl -= 1;
        } else {
          this.bytes.next();
        }
        if (nestingLvl === 0)
          break;
      }
      if (nestingLvl !== 0)
        throw new PDFStreamParsingError(startPos);
      return end;
    };
    PDFObjectParser2.forBytes = function(bytes, context, capNumbers) {
      return new PDFObjectParser2(ByteStream.of(bytes), context, capNumbers);
    };
    PDFObjectParser2.forByteStream = function(byteStream, context, capNumbers) {
      if (capNumbers === void 0) {
        capNumbers = false;
      }
      return new PDFObjectParser2(byteStream, context, capNumbers);
    };
    return PDFObjectParser2;
  }(BaseParser)
);
var PDFObjectStreamParser = (
  /** @class */
  function(_super) {
    __extends(PDFObjectStreamParser2, _super);
    function PDFObjectStreamParser2(rawStream, shouldWaitForTick) {
      var _this = _super.call(this, ByteStream.fromPDFRawStream(rawStream), rawStream.dict.context) || this;
      var dict = rawStream.dict;
      _this.alreadyParsed = false;
      _this.shouldWaitForTick = shouldWaitForTick || function() {
        return false;
      };
      _this.firstOffset = dict.lookup(PDFName.of("First"), PDFNumber).asNumber();
      _this.objectCount = dict.lookup(PDFName.of("N"), PDFNumber).asNumber();
      return _this;
    }
    PDFObjectStreamParser2.prototype.parseIntoContext = function() {
      return __awaiter(this, void 0, void 0, function() {
        var offsetsAndObjectNumbers, idx, len, _a2, objectNumber, offset, object2, ref;
        return __generator(this, function(_b2) {
          switch (_b2.label) {
            case 0:
              if (this.alreadyParsed) {
                throw new ReparseError("PDFObjectStreamParser", "parseIntoContext");
              }
              this.alreadyParsed = true;
              offsetsAndObjectNumbers = this.parseOffsetsAndObjectNumbers();
              idx = 0, len = offsetsAndObjectNumbers.length;
              _b2.label = 1;
            case 1:
              if (!(idx < len)) return [3, 4];
              _a2 = offsetsAndObjectNumbers[idx], objectNumber = _a2.objectNumber, offset = _a2.offset;
              this.bytes.moveTo(this.firstOffset + offset);
              object2 = this.parseObject();
              ref = PDFRef.of(objectNumber, 0);
              this.context.assign(ref, object2);
              if (!this.shouldWaitForTick()) return [3, 3];
              return [4, waitForTick()];
            case 2:
              _b2.sent();
              _b2.label = 3;
            case 3:
              idx++;
              return [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFObjectStreamParser2.prototype.parseOffsetsAndObjectNumbers = function() {
      var offsetsAndObjectNumbers = [];
      for (var idx = 0, len = this.objectCount; idx < len; idx++) {
        this.skipWhitespaceAndComments();
        var objectNumber = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var offset = this.parseRawInt();
        offsetsAndObjectNumbers.push({ objectNumber, offset });
      }
      return offsetsAndObjectNumbers;
    };
    PDFObjectStreamParser2.forStream = function(rawStream, shouldWaitForTick) {
      return new PDFObjectStreamParser2(rawStream, shouldWaitForTick);
    };
    return PDFObjectStreamParser2;
  }(PDFObjectParser)
);
var PDFXRefStreamParser = (
  /** @class */
  function() {
    function PDFXRefStreamParser2(rawStream) {
      this.alreadyParsed = false;
      this.dict = rawStream.dict;
      this.bytes = ByteStream.fromPDFRawStream(rawStream);
      this.context = this.dict.context;
      var Size = this.dict.lookup(PDFName.of("Size"), PDFNumber);
      var Index = this.dict.lookup(PDFName.of("Index"));
      if (Index instanceof PDFArray) {
        this.subsections = [];
        for (var idx = 0, len = Index.size(); idx < len; idx += 2) {
          var firstObjectNumber = Index.lookup(idx + 0, PDFNumber).asNumber();
          var length_1 = Index.lookup(idx + 1, PDFNumber).asNumber();
          this.subsections.push({ firstObjectNumber, length: length_1 });
        }
      } else {
        this.subsections = [{ firstObjectNumber: 0, length: Size.asNumber() }];
      }
      var W = this.dict.lookup(PDFName.of("W"), PDFArray);
      this.byteWidths = [-1, -1, -1];
      for (var idx = 0, len = W.size(); idx < len; idx++) {
        this.byteWidths[idx] = W.lookup(idx, PDFNumber).asNumber();
      }
    }
    PDFXRefStreamParser2.prototype.parseIntoContext = function() {
      if (this.alreadyParsed) {
        throw new ReparseError("PDFXRefStreamParser", "parseIntoContext");
      }
      this.alreadyParsed = true;
      this.context.trailerInfo = {
        Root: this.dict.get(PDFName.of("Root")),
        Encrypt: this.dict.get(PDFName.of("Encrypt")),
        Info: this.dict.get(PDFName.of("Info")),
        ID: this.dict.get(PDFName.of("ID"))
      };
      var entries = this.parseEntries();
      return entries;
    };
    PDFXRefStreamParser2.prototype.parseEntries = function() {
      var entries = [];
      var _a2 = this.byteWidths, typeFieldWidth = _a2[0], offsetFieldWidth = _a2[1], genFieldWidth = _a2[2];
      for (var subsectionIdx = 0, subsectionLen = this.subsections.length; subsectionIdx < subsectionLen; subsectionIdx++) {
        var _b2 = this.subsections[subsectionIdx], firstObjectNumber = _b2.firstObjectNumber, length_2 = _b2.length;
        for (var objIdx = 0; objIdx < length_2; objIdx++) {
          var type = 0;
          for (var idx = 0, len = typeFieldWidth; idx < len; idx++) {
            type = type << 8 | this.bytes.next();
          }
          var offset = 0;
          for (var idx = 0, len = offsetFieldWidth; idx < len; idx++) {
            offset = offset << 8 | this.bytes.next();
          }
          var generationNumber = 0;
          for (var idx = 0, len = genFieldWidth; idx < len; idx++) {
            generationNumber = generationNumber << 8 | this.bytes.next();
          }
          if (typeFieldWidth === 0)
            type = 1;
          var objectNumber = firstObjectNumber + objIdx;
          var entry = {
            ref: PDFRef.of(objectNumber, generationNumber),
            offset,
            deleted: type === 0,
            inObjectStream: type === 2
          };
          entries.push(entry);
        }
      }
      return entries;
    };
    PDFXRefStreamParser2.forStream = function(rawStream) {
      return new PDFXRefStreamParser2(rawStream);
    };
    return PDFXRefStreamParser2;
  }()
);
var PDFParser = (
  /** @class */
  function(_super) {
    __extends(PDFParser2, _super);
    function PDFParser2(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers) {
      if (objectsPerTick === void 0) {
        objectsPerTick = Infinity;
      }
      if (throwOnInvalidObject === void 0) {
        throwOnInvalidObject = false;
      }
      if (capNumbers === void 0) {
        capNumbers = false;
      }
      var _this = _super.call(this, ByteStream.of(pdfBytes), PDFContext.create(), capNumbers) || this;
      _this.alreadyParsed = false;
      _this.parsedObjects = 0;
      _this.shouldWaitForTick = function() {
        _this.parsedObjects += 1;
        return _this.parsedObjects % _this.objectsPerTick === 0;
      };
      _this.objectsPerTick = objectsPerTick;
      _this.throwOnInvalidObject = throwOnInvalidObject;
      return _this;
    }
    PDFParser2.prototype.parseDocument = function() {
      return __awaiter(this, void 0, void 0, function() {
        var prevOffset, offset;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (this.alreadyParsed) {
                throw new ReparseError("PDFParser", "parseDocument");
              }
              this.alreadyParsed = true;
              this.context.header = this.parseHeader();
              _a2.label = 1;
            case 1:
              if (!!this.bytes.done()) return [3, 3];
              return [4, this.parseDocumentSection()];
            case 2:
              _a2.sent();
              offset = this.bytes.offset();
              if (offset === prevOffset) {
                throw new StalledParserError(this.bytes.position());
              }
              prevOffset = offset;
              return [3, 1];
            case 3:
              this.maybeRecoverRoot();
              if (this.context.lookup(PDFRef.of(0))) {
                console.warn("Removing parsed object: 0 0 R");
                this.context.delete(PDFRef.of(0));
              }
              return [2, this.context];
          }
        });
      });
    };
    PDFParser2.prototype.maybeRecoverRoot = function() {
      var isValidCatalog = function(obj) {
        return obj instanceof PDFDict && obj.lookup(PDFName.of("Type")) === PDFName.of("Catalog");
      };
      var catalog = this.context.lookup(this.context.trailerInfo.Root);
      if (!isValidCatalog(catalog)) {
        var indirectObjects = this.context.enumerateIndirectObjects();
        for (var idx = 0, len = indirectObjects.length; idx < len; idx++) {
          var _a2 = indirectObjects[idx], ref = _a2[0], object2 = _a2[1];
          if (isValidCatalog(object2)) {
            this.context.trailerInfo.Root = ref;
          }
        }
      }
    };
    PDFParser2.prototype.parseHeader = function() {
      while (!this.bytes.done()) {
        if (this.matchKeyword(Keywords.header)) {
          var major = this.parseRawInt();
          this.bytes.assertNext(CharCodes$1.Period);
          var minor = this.parseRawInt();
          var header = PDFHeader.forVersion(major, minor);
          this.skipBinaryHeaderComment();
          return header;
        }
        this.bytes.next();
      }
      throw new MissingPDFHeaderError(this.bytes.position());
    };
    PDFParser2.prototype.parseIndirectObjectHeader = function() {
      this.skipWhitespaceAndComments();
      var objectNumber = this.parseRawInt();
      this.skipWhitespaceAndComments();
      var generationNumber = this.parseRawInt();
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.obj)) {
        throw new MissingKeywordError(this.bytes.position(), Keywords.obj);
      }
      return PDFRef.of(objectNumber, generationNumber);
    };
    PDFParser2.prototype.matchIndirectObjectHeader = function() {
      var initialOffset = this.bytes.offset();
      try {
        this.parseIndirectObjectHeader();
        return true;
      } catch (e) {
        this.bytes.moveTo(initialOffset);
        return false;
      }
    };
    PDFParser2.prototype.parseIndirectObject = function() {
      return __awaiter(this, void 0, void 0, function() {
        var ref, object2;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              ref = this.parseIndirectObjectHeader();
              this.skipWhitespaceAndComments();
              object2 = this.parseObject();
              this.skipWhitespaceAndComments();
              this.matchKeyword(Keywords.endobj);
              if (!(object2 instanceof PDFRawStream && object2.dict.lookup(PDFName.of("Type")) === PDFName.of("ObjStm"))) return [3, 2];
              return [4, PDFObjectStreamParser.forStream(object2, this.shouldWaitForTick).parseIntoContext()];
            case 1:
              _a2.sent();
              return [3, 3];
            case 2:
              if (object2 instanceof PDFRawStream && object2.dict.lookup(PDFName.of("Type")) === PDFName.of("XRef")) {
                PDFXRefStreamParser.forStream(object2).parseIntoContext();
              } else {
                this.context.assign(ref, object2);
              }
              _a2.label = 3;
            case 3:
              return [2, ref];
          }
        });
      });
    };
    PDFParser2.prototype.tryToParseInvalidIndirectObject = function() {
      var startPos = this.bytes.position();
      var msg = "Trying to parse invalid object: " + JSON.stringify(startPos) + ")";
      if (this.throwOnInvalidObject)
        throw new Error(msg);
      console.warn(msg);
      var ref = this.parseIndirectObjectHeader();
      console.warn("Invalid object ref: " + ref);
      this.skipWhitespaceAndComments();
      var start = this.bytes.offset();
      var failed = true;
      while (!this.bytes.done()) {
        if (this.matchKeyword(Keywords.endobj)) {
          failed = false;
        }
        if (!failed)
          break;
        this.bytes.next();
      }
      if (failed)
        throw new PDFInvalidObjectParsingError(startPos);
      var end = this.bytes.offset() - Keywords.endobj.length;
      var object2 = PDFInvalidObject.of(this.bytes.slice(start, end));
      this.context.assign(ref, object2);
      return ref;
    };
    PDFParser2.prototype.parseIndirectObjects = function() {
      return __awaiter(this, void 0, void 0, function() {
        var initialOffset;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              this.skipWhitespaceAndComments();
              _a2.label = 1;
            case 1:
              if (!(!this.bytes.done() && IsDigit[this.bytes.peek()])) return [3, 8];
              initialOffset = this.bytes.offset();
              _a2.label = 2;
            case 2:
              _a2.trys.push([2, 4, , 5]);
              return [4, this.parseIndirectObject()];
            case 3:
              _a2.sent();
              return [3, 5];
            case 4:
              _a2.sent();
              this.bytes.moveTo(initialOffset);
              this.tryToParseInvalidIndirectObject();
              return [3, 5];
            case 5:
              this.skipWhitespaceAndComments();
              this.skipJibberish();
              if (!this.shouldWaitForTick()) return [3, 7];
              return [4, waitForTick()];
            case 6:
              _a2.sent();
              _a2.label = 7;
            case 7:
              return [3, 1];
            case 8:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFParser2.prototype.maybeParseCrossRefSection = function() {
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.xref))
        return;
      this.skipWhitespaceAndComments();
      var objectNumber = -1;
      var xref = PDFCrossRefSection.createEmpty();
      while (!this.bytes.done() && IsDigit[this.bytes.peek()]) {
        var firstInt = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var secondInt = this.parseRawInt();
        this.skipWhitespaceAndComments();
        var byte = this.bytes.peek();
        if (byte === CharCodes$1.n || byte === CharCodes$1.f) {
          var ref = PDFRef.of(objectNumber, secondInt);
          if (this.bytes.next() === CharCodes$1.n) {
            xref.addEntry(ref, firstInt);
          } else {
            xref.addDeletedEntry(ref, firstInt);
          }
          objectNumber += 1;
        } else {
          objectNumber = firstInt;
        }
        this.skipWhitespaceAndComments();
      }
      return xref;
    };
    PDFParser2.prototype.maybeParseTrailerDict = function() {
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.trailer))
        return;
      this.skipWhitespaceAndComments();
      var dict = this.parseDict();
      var context = this.context;
      context.trailerInfo = {
        Root: dict.get(PDFName.of("Root")) || context.trailerInfo.Root,
        Encrypt: dict.get(PDFName.of("Encrypt")) || context.trailerInfo.Encrypt,
        Info: dict.get(PDFName.of("Info")) || context.trailerInfo.Info,
        ID: dict.get(PDFName.of("ID")) || context.trailerInfo.ID
      };
    };
    PDFParser2.prototype.maybeParseTrailer = function() {
      this.skipWhitespaceAndComments();
      if (!this.matchKeyword(Keywords.startxref))
        return;
      this.skipWhitespaceAndComments();
      var offset = this.parseRawInt();
      this.skipWhitespace();
      this.matchKeyword(Keywords.eof);
      this.skipWhitespaceAndComments();
      this.matchKeyword(Keywords.eof);
      this.skipWhitespaceAndComments();
      return PDFTrailer.forLastCrossRefSectionOffset(offset);
    };
    PDFParser2.prototype.parseDocumentSection = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, this.parseIndirectObjects()];
            case 1:
              _a2.sent();
              this.maybeParseCrossRefSection();
              this.maybeParseTrailerDict();
              this.maybeParseTrailer();
              this.skipJibberish();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFParser2.prototype.skipJibberish = function() {
      this.skipWhitespaceAndComments();
      while (!this.bytes.done()) {
        var initialOffset = this.bytes.offset();
        var byte = this.bytes.peek();
        var isAlphaNumeric = byte >= CharCodes$1.Space && byte <= CharCodes$1.Tilde;
        if (isAlphaNumeric) {
          if (this.matchKeyword(Keywords.xref) || this.matchKeyword(Keywords.trailer) || this.matchKeyword(Keywords.startxref) || this.matchIndirectObjectHeader()) {
            this.bytes.moveTo(initialOffset);
            break;
          }
        }
        this.bytes.next();
      }
    };
    PDFParser2.prototype.skipBinaryHeaderComment = function() {
      this.skipWhitespaceAndComments();
      try {
        var initialOffset = this.bytes.offset();
        this.parseIndirectObjectHeader();
        this.bytes.moveTo(initialOffset);
      } catch (e) {
        this.bytes.next();
        this.skipWhitespaceAndComments();
      }
    };
    PDFParser2.forBytesWithOptions = function(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers) {
      return new PDFParser2(pdfBytes, objectsPerTick, throwOnInvalidObject, capNumbers);
    };
    return PDFParser2;
  }(PDFObjectParser)
);
var flag = function(bitIndex) {
  return 1 << bitIndex;
};
var AnnotationFlags;
(function(AnnotationFlags2) {
  AnnotationFlags2[AnnotationFlags2["Invisible"] = flag(1 - 1)] = "Invisible";
  AnnotationFlags2[AnnotationFlags2["Hidden"] = flag(2 - 1)] = "Hidden";
  AnnotationFlags2[AnnotationFlags2["Print"] = flag(3 - 1)] = "Print";
  AnnotationFlags2[AnnotationFlags2["NoZoom"] = flag(4 - 1)] = "NoZoom";
  AnnotationFlags2[AnnotationFlags2["NoRotate"] = flag(5 - 1)] = "NoRotate";
  AnnotationFlags2[AnnotationFlags2["NoView"] = flag(6 - 1)] = "NoView";
  AnnotationFlags2[AnnotationFlags2["ReadOnly"] = flag(7 - 1)] = "ReadOnly";
  AnnotationFlags2[AnnotationFlags2["Locked"] = flag(8 - 1)] = "Locked";
  AnnotationFlags2[AnnotationFlags2["ToggleNoView"] = flag(9 - 1)] = "ToggleNoView";
  AnnotationFlags2[AnnotationFlags2["LockedContents"] = flag(10 - 1)] = "LockedContents";
})(AnnotationFlags || (AnnotationFlags = {}));
var asPDFName = function(name) {
  return name instanceof PDFName ? name : PDFName.of(name);
};
var asPDFNumber = function(num) {
  return num instanceof PDFNumber ? num : PDFNumber.of(num);
};
var asNumber = function(num) {
  return num instanceof PDFNumber ? num.asNumber() : num;
};
var RotationTypes;
(function(RotationTypes2) {
  RotationTypes2["Degrees"] = "degrees";
  RotationTypes2["Radians"] = "radians";
})(RotationTypes || (RotationTypes = {}));
var degrees = function(degreeAngle) {
  assertIs(degreeAngle, "degreeAngle", ["number"]);
  return { type: RotationTypes.Degrees, angle: degreeAngle };
};
var Radians = RotationTypes.Radians, Degrees = RotationTypes.Degrees;
var degreesToRadians = function(degree) {
  return degree * Math.PI / 180;
};
var radiansToDegrees = function(radian) {
  return radian * 180 / Math.PI;
};
var toRadians = function(rotation) {
  return rotation.type === Radians ? rotation.angle : rotation.type === Degrees ? degreesToRadians(rotation.angle) : error("Invalid rotation: " + JSON.stringify(rotation));
};
var toDegrees = function(rotation) {
  return rotation.type === Radians ? radiansToDegrees(rotation.angle) : rotation.type === Degrees ? rotation.angle : error("Invalid rotation: " + JSON.stringify(rotation));
};
var reduceRotation = function(degreeAngle) {
  if (degreeAngle === void 0) {
    degreeAngle = 0;
  }
  var quadrants = degreeAngle / 90 % 4;
  if (quadrants === 0)
    return 0;
  if (quadrants === 1)
    return 90;
  if (quadrants === 2)
    return 180;
  if (quadrants === 3)
    return 270;
  return 0;
};
var adjustDimsForRotation = function(dims, degreeAngle) {
  if (degreeAngle === void 0) {
    degreeAngle = 0;
  }
  var rotation = reduceRotation(degreeAngle);
  return rotation === 90 || rotation === 270 ? { width: dims.height, height: dims.width } : { width: dims.width, height: dims.height };
};
var rotateRectangle = function(rectangle, borderWidth, degreeAngle) {
  if (borderWidth === void 0) {
    borderWidth = 0;
  }
  if (degreeAngle === void 0) {
    degreeAngle = 0;
  }
  var x = rectangle.x, y = rectangle.y, w = rectangle.width, h = rectangle.height;
  var r = reduceRotation(degreeAngle);
  var b = borderWidth / 2;
  if (r === 0)
    return { x: x - b, y: y - b, width: w, height: h };
  else if (r === 90)
    return { x: x - h + b, y: y - b, width: h, height: w };
  else if (r === 180)
    return { x: x - w + b, y: y - h + b, width: w, height: h };
  else if (r === 270)
    return { x: x - b, y: y - w + b, width: h, height: w };
  else
    return { x: x - b, y: y - b, width: w, height: h };
};
var clip = function() {
  return PDFOperator.of(Ops.ClipNonZero);
};
var cos = Math.cos, sin = Math.sin, tan = Math.tan;
var concatTransformationMatrix = function(a, b, c, d, e, f) {
  return PDFOperator.of(Ops.ConcatTransformationMatrix, [
    asPDFNumber(a),
    asPDFNumber(b),
    asPDFNumber(c),
    asPDFNumber(d),
    asPDFNumber(e),
    asPDFNumber(f)
  ]);
};
var translate = function(xPos, yPos) {
  return concatTransformationMatrix(1, 0, 0, 1, xPos, yPos);
};
var scale = function(xPos, yPos) {
  return concatTransformationMatrix(xPos, 0, 0, yPos, 0, 0);
};
var rotateRadians = function(angle) {
  return concatTransformationMatrix(cos(asNumber(angle)), sin(asNumber(angle)), -sin(asNumber(angle)), cos(asNumber(angle)), 0, 0);
};
var rotateDegrees = function(angle) {
  return rotateRadians(degreesToRadians(asNumber(angle)));
};
var skewRadians = function(xSkewAngle, ySkewAngle) {
  return concatTransformationMatrix(1, tan(asNumber(xSkewAngle)), tan(asNumber(ySkewAngle)), 1, 0, 0);
};
var setDashPattern = function(dashArray, dashPhase) {
  return PDFOperator.of(Ops.SetLineDashPattern, [
    "[" + dashArray.map(asPDFNumber).join(" ") + "]",
    asPDFNumber(dashPhase)
  ]);
};
var LineCapStyle;
(function(LineCapStyle2) {
  LineCapStyle2[LineCapStyle2["Butt"] = 0] = "Butt";
  LineCapStyle2[LineCapStyle2["Round"] = 1] = "Round";
  LineCapStyle2[LineCapStyle2["Projecting"] = 2] = "Projecting";
})(LineCapStyle || (LineCapStyle = {}));
var setLineCap = function(style) {
  return PDFOperator.of(Ops.SetLineCapStyle, [asPDFNumber(style)]);
};
var LineJoinStyle;
(function(LineJoinStyle2) {
  LineJoinStyle2[LineJoinStyle2["Miter"] = 0] = "Miter";
  LineJoinStyle2[LineJoinStyle2["Round"] = 1] = "Round";
  LineJoinStyle2[LineJoinStyle2["Bevel"] = 2] = "Bevel";
})(LineJoinStyle || (LineJoinStyle = {}));
var setGraphicsState = function(state) {
  return PDFOperator.of(Ops.SetGraphicsStateParams, [asPDFName(state)]);
};
var pushGraphicsState = function() {
  return PDFOperator.of(Ops.PushGraphicsState);
};
var popGraphicsState = function() {
  return PDFOperator.of(Ops.PopGraphicsState);
};
var setLineWidth = function(width) {
  return PDFOperator.of(Ops.SetLineWidth, [asPDFNumber(width)]);
};
var appendBezierCurve = function(x1, y1, x2, y2, x3, y3) {
  return PDFOperator.of(Ops.AppendBezierCurve, [
    asPDFNumber(x1),
    asPDFNumber(y1),
    asPDFNumber(x2),
    asPDFNumber(y2),
    asPDFNumber(x3),
    asPDFNumber(y3)
  ]);
};
var appendQuadraticCurve = function(x1, y1, x2, y2) {
  return PDFOperator.of(Ops.CurveToReplicateInitialPoint, [
    asPDFNumber(x1),
    asPDFNumber(y1),
    asPDFNumber(x2),
    asPDFNumber(y2)
  ]);
};
var closePath = function() {
  return PDFOperator.of(Ops.ClosePath);
};
var moveTo = function(xPos, yPos) {
  return PDFOperator.of(Ops.MoveTo, [asPDFNumber(xPos), asPDFNumber(yPos)]);
};
var lineTo = function(xPos, yPos) {
  return PDFOperator.of(Ops.LineTo, [asPDFNumber(xPos), asPDFNumber(yPos)]);
};
var stroke = function() {
  return PDFOperator.of(Ops.StrokePath);
};
var fill = function() {
  return PDFOperator.of(Ops.FillNonZero);
};
var fillAndStroke = function() {
  return PDFOperator.of(Ops.FillNonZeroAndStroke);
};
var endPath = function() {
  return PDFOperator.of(Ops.EndPath);
};
var nextLine = function() {
  return PDFOperator.of(Ops.NextLine);
};
var showText = function(text) {
  return PDFOperator.of(Ops.ShowText, [text]);
};
var beginText = function() {
  return PDFOperator.of(Ops.BeginText);
};
var endText = function() {
  return PDFOperator.of(Ops.EndText);
};
var setFontAndSize = function(name, size) {
  return PDFOperator.of(Ops.SetFontAndSize, [asPDFName(name), asPDFNumber(size)]);
};
var setLineHeight = function(lineHeight) {
  return PDFOperator.of(Ops.SetTextLineHeight, [asPDFNumber(lineHeight)]);
};
var TextRenderingMode;
(function(TextRenderingMode2) {
  TextRenderingMode2[TextRenderingMode2["Fill"] = 0] = "Fill";
  TextRenderingMode2[TextRenderingMode2["Outline"] = 1] = "Outline";
  TextRenderingMode2[TextRenderingMode2["FillAndOutline"] = 2] = "FillAndOutline";
  TextRenderingMode2[TextRenderingMode2["Invisible"] = 3] = "Invisible";
  TextRenderingMode2[TextRenderingMode2["FillAndClip"] = 4] = "FillAndClip";
  TextRenderingMode2[TextRenderingMode2["OutlineAndClip"] = 5] = "OutlineAndClip";
  TextRenderingMode2[TextRenderingMode2["FillAndOutlineAndClip"] = 6] = "FillAndOutlineAndClip";
  TextRenderingMode2[TextRenderingMode2["Clip"] = 7] = "Clip";
})(TextRenderingMode || (TextRenderingMode = {}));
var setTextMatrix = function(a, b, c, d, e, f) {
  return PDFOperator.of(Ops.SetTextMatrix, [
    asPDFNumber(a),
    asPDFNumber(b),
    asPDFNumber(c),
    asPDFNumber(d),
    asPDFNumber(e),
    asPDFNumber(f)
  ]);
};
var rotateAndSkewTextRadiansAndTranslate = function(rotationAngle, xSkewAngle, ySkewAngle, x, y) {
  return setTextMatrix(cos(asNumber(rotationAngle)), sin(asNumber(rotationAngle)) + tan(asNumber(xSkewAngle)), -sin(asNumber(rotationAngle)) + tan(asNumber(ySkewAngle)), cos(asNumber(rotationAngle)), x, y);
};
var drawObject = function(name) {
  return PDFOperator.of(Ops.DrawObject, [asPDFName(name)]);
};
var setFillingGrayscaleColor = function(gray) {
  return PDFOperator.of(Ops.NonStrokingColorGray, [asPDFNumber(gray)]);
};
var setStrokingGrayscaleColor = function(gray) {
  return PDFOperator.of(Ops.StrokingColorGray, [asPDFNumber(gray)]);
};
var setFillingRgbColor = function(red, green, blue) {
  return PDFOperator.of(Ops.NonStrokingColorRgb, [
    asPDFNumber(red),
    asPDFNumber(green),
    asPDFNumber(blue)
  ]);
};
var setStrokingRgbColor = function(red, green, blue) {
  return PDFOperator.of(Ops.StrokingColorRgb, [
    asPDFNumber(red),
    asPDFNumber(green),
    asPDFNumber(blue)
  ]);
};
var setFillingCmykColor = function(cyan, magenta, yellow, key) {
  return PDFOperator.of(Ops.NonStrokingColorCmyk, [
    asPDFNumber(cyan),
    asPDFNumber(magenta),
    asPDFNumber(yellow),
    asPDFNumber(key)
  ]);
};
var setStrokingCmykColor = function(cyan, magenta, yellow, key) {
  return PDFOperator.of(Ops.StrokingColorCmyk, [
    asPDFNumber(cyan),
    asPDFNumber(magenta),
    asPDFNumber(yellow),
    asPDFNumber(key)
  ]);
};
var beginMarkedContent = function(tag) {
  return PDFOperator.of(Ops.BeginMarkedContent, [asPDFName(tag)]);
};
var endMarkedContent = function() {
  return PDFOperator.of(Ops.EndMarkedContent);
};
var ColorTypes;
(function(ColorTypes2) {
  ColorTypes2["Grayscale"] = "Grayscale";
  ColorTypes2["RGB"] = "RGB";
  ColorTypes2["CMYK"] = "CMYK";
})(ColorTypes || (ColorTypes = {}));
var grayscale = function(gray) {
  assertRange(gray, "gray", 0, 1);
  return { type: ColorTypes.Grayscale, gray };
};
var rgb = function(red, green, blue) {
  assertRange(red, "red", 0, 1);
  assertRange(green, "green", 0, 1);
  assertRange(blue, "blue", 0, 1);
  return { type: ColorTypes.RGB, red, green, blue };
};
var cmyk = function(cyan, magenta, yellow, key) {
  assertRange(cyan, "cyan", 0, 1);
  assertRange(magenta, "magenta", 0, 1);
  assertRange(yellow, "yellow", 0, 1);
  assertRange(key, "key", 0, 1);
  return { type: ColorTypes.CMYK, cyan, magenta, yellow, key };
};
var Grayscale = ColorTypes.Grayscale, RGB = ColorTypes.RGB, CMYK = ColorTypes.CMYK;
var setFillingColor = function(color) {
  return color.type === Grayscale ? setFillingGrayscaleColor(color.gray) : color.type === RGB ? setFillingRgbColor(color.red, color.green, color.blue) : color.type === CMYK ? setFillingCmykColor(color.cyan, color.magenta, color.yellow, color.key) : error("Invalid color: " + JSON.stringify(color));
};
var setStrokingColor = function(color) {
  return color.type === Grayscale ? setStrokingGrayscaleColor(color.gray) : color.type === RGB ? setStrokingRgbColor(color.red, color.green, color.blue) : color.type === CMYK ? setStrokingCmykColor(color.cyan, color.magenta, color.yellow, color.key) : error("Invalid color: " + JSON.stringify(color));
};
var componentsToColor = function(comps, scale2) {
  if (scale2 === void 0) {
    scale2 = 1;
  }
  return (comps === null || comps === void 0 ? void 0 : comps.length) === 1 ? grayscale(comps[0] * scale2) : (comps === null || comps === void 0 ? void 0 : comps.length) === 3 ? rgb(comps[0] * scale2, comps[1] * scale2, comps[2] * scale2) : (comps === null || comps === void 0 ? void 0 : comps.length) === 4 ? cmyk(comps[0] * scale2, comps[1] * scale2, comps[2] * scale2, comps[3] * scale2) : void 0;
};
var colorToComponents = function(color) {
  return color.type === Grayscale ? [color.gray] : color.type === RGB ? [color.red, color.green, color.blue] : color.type === CMYK ? [color.cyan, color.magenta, color.yellow, color.key] : error("Invalid color: " + JSON.stringify(color));
};
var cx = 0;
var cy = 0;
var px = 0;
var py = 0;
var sx = 0;
var sy = 0;
var parameters = /* @__PURE__ */ new Map([
  ["A", 7],
  ["a", 7],
  ["C", 6],
  ["c", 6],
  ["H", 1],
  ["h", 1],
  ["L", 2],
  ["l", 2],
  ["M", 2],
  ["m", 2],
  ["Q", 4],
  ["q", 4],
  ["S", 4],
  ["s", 4],
  ["T", 2],
  ["t", 2],
  ["V", 1],
  ["v", 1],
  ["Z", 0],
  ["z", 0]
]);
var parse = function(path) {
  var cmd;
  var ret = [];
  var args = [];
  var curArg = "";
  var foundDecimal = false;
  var params = 0;
  for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
    var c = path_1[_i];
    if (parameters.has(c)) {
      params = parameters.get(c);
      if (cmd) {
        if (curArg.length > 0) {
          args[args.length] = +curArg;
        }
        ret[ret.length] = { cmd, args };
        args = [];
        curArg = "";
        foundDecimal = false;
      }
      cmd = c;
    } else if ([" ", ","].includes(c) || c === "-" && curArg.length > 0 && curArg[curArg.length - 1] !== "e" || c === "." && foundDecimal) {
      if (curArg.length === 0) {
        continue;
      }
      if (args.length === params) {
        ret[ret.length] = { cmd, args };
        args = [+curArg];
        if (cmd === "M") {
          cmd = "L";
        }
        if (cmd === "m") {
          cmd = "l";
        }
      } else {
        args[args.length] = +curArg;
      }
      foundDecimal = c === ".";
      curArg = ["-", "."].includes(c) ? c : "";
    } else {
      curArg += c;
      if (c === ".") {
        foundDecimal = true;
      }
    }
  }
  if (curArg.length > 0) {
    if (args.length === params) {
      ret[ret.length] = { cmd, args };
      args = [+curArg];
      if (cmd === "M") {
        cmd = "L";
      }
      if (cmd === "m") {
        cmd = "l";
      }
    } else {
      args[args.length] = +curArg;
    }
  }
  ret[ret.length] = { cmd, args };
  return ret;
};
var apply = function(commands) {
  cx = cy = px = py = sx = sy = 0;
  var cmds = [];
  for (var i = 0; i < commands.length; i++) {
    var c = commands[i];
    if (c.cmd && typeof runners[c.cmd] === "function") {
      var cmd = runners[c.cmd](c.args);
      if (Array.isArray(cmd)) {
        cmds = cmds.concat(cmd);
      } else {
        cmds.push(cmd);
      }
    }
  }
  return cmds;
};
var runners = {
  M: function(a) {
    cx = a[0];
    cy = a[1];
    px = py = null;
    sx = cx;
    sy = cy;
    return moveTo(cx, cy);
  },
  m: function(a) {
    cx += a[0];
    cy += a[1];
    px = py = null;
    sx = cx;
    sy = cy;
    return moveTo(cx, cy);
  },
  C: function(a) {
    cx = a[4];
    cy = a[5];
    px = a[2];
    py = a[3];
    return appendBezierCurve(a[0], a[1], a[2], a[3], a[4], a[5]);
  },
  c: function(a) {
    var cmd = appendBezierCurve(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy, a[4] + cx, a[5] + cy);
    px = cx + a[2];
    py = cy + a[3];
    cx += a[4];
    cy += a[5];
    return cmd;
  },
  S: function(a) {
    if (px === null || py === null) {
      px = cx;
      py = cy;
    }
    var cmd = appendBezierCurve(cx - (px - cx), cy - (py - cy), a[0], a[1], a[2], a[3]);
    px = a[0];
    py = a[1];
    cx = a[2];
    cy = a[3];
    return cmd;
  },
  s: function(a) {
    if (px === null || py === null) {
      px = cx;
      py = cy;
    }
    var cmd = appendBezierCurve(cx - (px - cx), cy - (py - cy), cx + a[0], cy + a[1], cx + a[2], cy + a[3]);
    px = cx + a[0];
    py = cy + a[1];
    cx += a[2];
    cy += a[3];
    return cmd;
  },
  Q: function(a) {
    px = a[0];
    py = a[1];
    cx = a[2];
    cy = a[3];
    return appendQuadraticCurve(a[0], a[1], cx, cy);
  },
  q: function(a) {
    var cmd = appendQuadraticCurve(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy);
    px = cx + a[0];
    py = cy + a[1];
    cx += a[2];
    cy += a[3];
    return cmd;
  },
  T: function(a) {
    if (px === null || py === null) {
      px = cx;
      py = cy;
    } else {
      px = cx - (px - cx);
      py = cy - (py - cy);
    }
    var cmd = appendQuadraticCurve(px, py, a[0], a[1]);
    px = cx - (px - cx);
    py = cy - (py - cy);
    cx = a[0];
    cy = a[1];
    return cmd;
  },
  t: function(a) {
    if (px === null || py === null) {
      px = cx;
      py = cy;
    } else {
      px = cx - (px - cx);
      py = cy - (py - cy);
    }
    var cmd = appendQuadraticCurve(px, py, cx + a[0], cy + a[1]);
    cx += a[0];
    cy += a[1];
    return cmd;
  },
  A: function(a) {
    var cmds = solveArc(cx, cy, a);
    cx = a[5];
    cy = a[6];
    return cmds;
  },
  a: function(a) {
    a[5] += cx;
    a[6] += cy;
    var cmds = solveArc(cx, cy, a);
    cx = a[5];
    cy = a[6];
    return cmds;
  },
  L: function(a) {
    cx = a[0];
    cy = a[1];
    px = py = null;
    return lineTo(cx, cy);
  },
  l: function(a) {
    cx += a[0];
    cy += a[1];
    px = py = null;
    return lineTo(cx, cy);
  },
  H: function(a) {
    cx = a[0];
    px = py = null;
    return lineTo(cx, cy);
  },
  h: function(a) {
    cx += a[0];
    px = py = null;
    return lineTo(cx, cy);
  },
  V: function(a) {
    cy = a[0];
    px = py = null;
    return lineTo(cx, cy);
  },
  v: function(a) {
    cy += a[0];
    px = py = null;
    return lineTo(cx, cy);
  },
  Z: function() {
    var cmd = closePath();
    cx = sx;
    cy = sy;
    return cmd;
  },
  z: function() {
    var cmd = closePath();
    cx = sx;
    cy = sy;
    return cmd;
  }
};
var solveArc = function(x, y, coords) {
  var rx = coords[0], ry = coords[1], rot = coords[2], large = coords[3], sweep = coords[4], ex = coords[5], ey = coords[6];
  var segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);
  var cmds = [];
  for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
    var seg = segs_1[_i];
    var bez = segmentToBezier.apply(void 0, seg);
    cmds.push(appendBezierCurve.apply(void 0, bez));
  }
  return cmds;
};
var arcToSegments = function(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
  var th = rotateX * (Math.PI / 180);
  var sinTh = Math.sin(th);
  var cosTh = Math.cos(th);
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  px = cosTh * (ox - x) * 0.5 + sinTh * (oy - y) * 0.5;
  py = cosTh * (oy - y) * 0.5 - sinTh * (ox - x) * 0.5;
  var pl = px * px / (rx * rx) + py * py / (ry * ry);
  if (pl > 1) {
    pl = Math.sqrt(pl);
    rx *= pl;
    ry *= pl;
  }
  var a00 = cosTh / rx;
  var a01 = sinTh / rx;
  var a10 = -sinTh / ry;
  var a11 = cosTh / ry;
  var x0 = a00 * ox + a01 * oy;
  var y0 = a10 * ox + a11 * oy;
  var x1 = a00 * x + a01 * y;
  var y1 = a10 * x + a11 * y;
  var d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
  var sfactorSq = 1 / d - 0.25;
  if (sfactorSq < 0) {
    sfactorSq = 0;
  }
  var sfactor = Math.sqrt(sfactorSq);
  if (sweep === large) {
    sfactor = -sfactor;
  }
  var xc = 0.5 * (x0 + x1) - sfactor * (y1 - y0);
  var yc = 0.5 * (y0 + y1) + sfactor * (x1 - x0);
  var th0 = Math.atan2(y0 - yc, x0 - xc);
  var th1 = Math.atan2(y1 - yc, x1 - xc);
  var thArc = th1 - th0;
  if (thArc < 0 && sweep === 1) {
    thArc += 2 * Math.PI;
  } else if (thArc > 0 && sweep === 0) {
    thArc -= 2 * Math.PI;
  }
  var segments = Math.ceil(Math.abs(thArc / (Math.PI * 0.5 + 1e-3)));
  var result = [];
  for (var i = 0; i < segments; i++) {
    var th2 = th0 + i * thArc / segments;
    var th3 = th0 + (i + 1) * thArc / segments;
    result[i] = [xc, yc, th2, th3, rx, ry, sinTh, cosTh];
  }
  return result;
};
var segmentToBezier = function(cx1, cy1, th0, th1, rx, ry, sinTh, cosTh) {
  var a00 = cosTh * rx;
  var a01 = -sinTh * ry;
  var a10 = sinTh * rx;
  var a11 = cosTh * ry;
  var thHalf = 0.5 * (th1 - th0);
  var t = 8 / 3 * Math.sin(thHalf * 0.5) * Math.sin(thHalf * 0.5) / Math.sin(thHalf);
  var x1 = cx1 + Math.cos(th0) - t * Math.sin(th0);
  var y1 = cy1 + Math.sin(th0) + t * Math.cos(th0);
  var x3 = cx1 + Math.cos(th1);
  var y3 = cy1 + Math.sin(th1);
  var x2 = x3 + t * Math.sin(th1);
  var y2 = y3 - t * Math.cos(th1);
  var result = [
    a00 * x1 + a01 * y1,
    a10 * x1 + a11 * y1,
    a00 * x2 + a01 * y2,
    a10 * x2 + a11 * y2,
    a00 * x3 + a01 * y3,
    a10 * x3 + a11 * y3
  ];
  return result;
};
var svgPathToOperators = function(path) {
  return apply(parse(path));
};
var drawLinesOfText = function(lines, options) {
  var operators = [
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    beginText(),
    setFillingColor(options.color),
    setFontAndSize(options.font, options.size),
    setLineHeight(options.lineHeight),
    rotateAndSkewTextRadiansAndTranslate(toRadians(options.rotate), toRadians(options.xSkew), toRadians(options.ySkew), options.x, options.y)
  ].filter(Boolean);
  for (var idx = 0, len = lines.length; idx < len; idx++) {
    operators.push(showText(lines[idx]), nextLine());
  }
  operators.push(endText(), popGraphicsState());
  return operators;
};
var drawImage = function(name, options) {
  return [
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    translate(options.x, options.y),
    rotateRadians(toRadians(options.rotate)),
    scale(options.width, options.height),
    skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
    drawObject(name),
    popGraphicsState()
  ].filter(Boolean);
};
var drawPage = function(name, options) {
  return [
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    translate(options.x, options.y),
    rotateRadians(toRadians(options.rotate)),
    scale(options.xScale, options.yScale),
    skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
    drawObject(name),
    popGraphicsState()
  ].filter(Boolean);
};
var drawLine = function(options) {
  var _a2, _b2;
  return [
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    options.color && setStrokingColor(options.color),
    setLineWidth(options.thickness),
    setDashPattern((_a2 = options.dashArray) !== null && _a2 !== void 0 ? _a2 : [], (_b2 = options.dashPhase) !== null && _b2 !== void 0 ? _b2 : 0),
    moveTo(options.start.x, options.start.y),
    options.lineCap && setLineCap(options.lineCap),
    moveTo(options.start.x, options.start.y),
    lineTo(options.end.x, options.end.y),
    stroke(),
    popGraphicsState()
  ].filter(Boolean);
};
var drawRectangle = function(options) {
  var _a2, _b2;
  return [
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    options.color && setFillingColor(options.color),
    options.borderColor && setStrokingColor(options.borderColor),
    setLineWidth(options.borderWidth),
    options.borderLineCap && setLineCap(options.borderLineCap),
    setDashPattern((_a2 = options.borderDashArray) !== null && _a2 !== void 0 ? _a2 : [], (_b2 = options.borderDashPhase) !== null && _b2 !== void 0 ? _b2 : 0),
    translate(options.x, options.y),
    rotateRadians(toRadians(options.rotate)),
    skewRadians(toRadians(options.xSkew), toRadians(options.ySkew)),
    moveTo(0, 0),
    lineTo(0, options.height),
    lineTo(options.width, options.height),
    lineTo(options.width, 0),
    closePath(),
    // prettier-ignore
    options.color && options.borderWidth ? fillAndStroke() : options.color ? fill() : options.borderColor ? stroke() : closePath(),
    popGraphicsState()
  ].filter(Boolean);
};
var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
var drawEllipsePath = function(config) {
  var x = asNumber(config.x);
  var y = asNumber(config.y);
  var xScale = asNumber(config.xScale);
  var yScale = asNumber(config.yScale);
  x -= xScale;
  y -= yScale;
  var ox = xScale * KAPPA;
  var oy = yScale * KAPPA;
  var xe = x + xScale * 2;
  var ye = y + yScale * 2;
  var xm = x + xScale;
  var ym = y + yScale;
  return [
    pushGraphicsState(),
    moveTo(x, ym),
    appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
    appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
    appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
    appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym),
    popGraphicsState()
  ];
};
var drawEllipseCurves = function(config) {
  var centerX = asNumber(config.x);
  var centerY = asNumber(config.y);
  var xScale = asNumber(config.xScale);
  var yScale = asNumber(config.yScale);
  var x = -xScale;
  var y = -yScale;
  var ox = xScale * KAPPA;
  var oy = yScale * KAPPA;
  var xe = x + xScale * 2;
  var ye = y + yScale * 2;
  var xm = x + xScale;
  var ym = y + yScale;
  return [
    translate(centerX, centerY),
    rotateRadians(toRadians(config.rotate)),
    moveTo(x, ym),
    appendBezierCurve(x, ym - oy, xm - ox, y, xm, y),
    appendBezierCurve(xm + ox, y, xe, ym - oy, xe, ym),
    appendBezierCurve(xe, ym + oy, xm + ox, ye, xm, ye),
    appendBezierCurve(xm - ox, ye, x, ym + oy, x, ym)
  ];
};
var drawEllipse = function(options) {
  var _a2, _b2, _c;
  return __spreadArrays([
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    options.color && setFillingColor(options.color),
    options.borderColor && setStrokingColor(options.borderColor),
    setLineWidth(options.borderWidth),
    options.borderLineCap && setLineCap(options.borderLineCap),
    setDashPattern((_a2 = options.borderDashArray) !== null && _a2 !== void 0 ? _a2 : [], (_b2 = options.borderDashPhase) !== null && _b2 !== void 0 ? _b2 : 0)
  ], options.rotate === void 0 ? drawEllipsePath({
    x: options.x,
    y: options.y,
    xScale: options.xScale,
    yScale: options.yScale
  }) : drawEllipseCurves({
    x: options.x,
    y: options.y,
    xScale: options.xScale,
    yScale: options.yScale,
    rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : degrees(0)
  }), [
    // prettier-ignore
    options.color && options.borderWidth ? fillAndStroke() : options.color ? fill() : options.borderColor ? stroke() : closePath(),
    popGraphicsState()
  ]).filter(Boolean);
};
var drawSvgPath = function(path, options) {
  var _a2, _b2, _c;
  return __spreadArrays([
    pushGraphicsState(),
    options.graphicsState && setGraphicsState(options.graphicsState),
    translate(options.x, options.y),
    rotateRadians(toRadians((_a2 = options.rotate) !== null && _a2 !== void 0 ? _a2 : degrees(0))),
    // SVG path Y axis is opposite pdf-lib's
    options.scale ? scale(options.scale, -options.scale) : scale(1, -1),
    options.color && setFillingColor(options.color),
    options.borderColor && setStrokingColor(options.borderColor),
    options.borderWidth && setLineWidth(options.borderWidth),
    options.borderLineCap && setLineCap(options.borderLineCap),
    setDashPattern((_b2 = options.borderDashArray) !== null && _b2 !== void 0 ? _b2 : [], (_c = options.borderDashPhase) !== null && _c !== void 0 ? _c : 0)
  ], svgPathToOperators(path), [
    // prettier-ignore
    options.color && options.borderWidth ? fillAndStroke() : options.color ? fill() : options.borderColor ? stroke() : closePath(),
    popGraphicsState()
  ]).filter(Boolean);
};
var drawCheckMark = function(options) {
  var size = asNumber(options.size);
  var p2x = -1 + 0.75;
  var p2y = -1 + 0.51;
  var p3y = 1 - 0.525;
  var p3x = 1 - 0.31;
  var p1x = -1 + 0.325;
  var p1y = 0.3995 / (p3y - p2y) + p2y;
  return [
    pushGraphicsState(),
    options.color && setStrokingColor(options.color),
    setLineWidth(options.thickness),
    translate(options.x, options.y),
    moveTo(p1x * size, p1y * size),
    lineTo(p2x * size, p2y * size),
    lineTo(p3x * size, p3y * size),
    stroke(),
    popGraphicsState()
  ].filter(Boolean);
};
var rotateInPlace = function(options) {
  return options.rotation === 0 ? [
    translate(0, 0),
    rotateDegrees(0)
  ] : options.rotation === 90 ? [
    translate(options.width, 0),
    rotateDegrees(90)
  ] : options.rotation === 180 ? [
    translate(options.width, options.height),
    rotateDegrees(180)
  ] : options.rotation === 270 ? [
    translate(0, options.height),
    rotateDegrees(270)
  ] : [];
};
var drawCheckBox = function(options) {
  var outline = drawRectangle({
    x: options.x,
    y: options.y,
    width: options.width,
    height: options.height,
    borderWidth: options.borderWidth,
    color: options.color,
    borderColor: options.borderColor,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  if (!options.filled)
    return outline;
  var width = asNumber(options.width);
  var height = asNumber(options.height);
  var checkMarkSize = Math.min(width, height) / 2;
  var checkMark = drawCheckMark({
    x: width / 2,
    y: height / 2,
    size: checkMarkSize,
    thickness: options.thickness,
    color: options.markColor
  });
  return __spreadArrays([pushGraphicsState()], outline, checkMark, [popGraphicsState()]);
};
var drawRadioButton = function(options) {
  var width = asNumber(options.width);
  var height = asNumber(options.height);
  var outlineScale = Math.min(width, height) / 2;
  var outline = drawEllipse({
    x: options.x,
    y: options.y,
    xScale: outlineScale,
    yScale: outlineScale,
    color: options.color,
    borderColor: options.borderColor,
    borderWidth: options.borderWidth
  });
  if (!options.filled)
    return outline;
  var dot = drawEllipse({
    x: options.x,
    y: options.y,
    xScale: outlineScale * 0.45,
    yScale: outlineScale * 0.45,
    color: options.dotColor,
    borderColor: void 0,
    borderWidth: 0
  });
  return __spreadArrays([pushGraphicsState()], outline, dot, [popGraphicsState()]);
};
var drawButton = function(options) {
  var x = asNumber(options.x);
  var y = asNumber(options.y);
  var width = asNumber(options.width);
  var height = asNumber(options.height);
  var background = drawRectangle({
    x,
    y,
    width,
    height,
    borderWidth: options.borderWidth,
    color: options.color,
    borderColor: options.borderColor,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  var lines = drawTextLines(options.textLines, {
    color: options.textColor,
    font: options.font,
    size: options.fontSize,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  return __spreadArrays([pushGraphicsState()], background, lines, [popGraphicsState()]);
};
var drawTextLines = function(lines, options) {
  var operators = [
    beginText(),
    setFillingColor(options.color),
    setFontAndSize(options.font, options.size)
  ];
  for (var idx = 0, len = lines.length; idx < len; idx++) {
    var _a2 = lines[idx], encoded = _a2.encoded, x = _a2.x, y = _a2.y;
    operators.push(rotateAndSkewTextRadiansAndTranslate(toRadians(options.rotate), toRadians(options.xSkew), toRadians(options.ySkew), x, y), showText(encoded));
  }
  operators.push(endText());
  return operators;
};
var drawTextField = function(options) {
  var x = asNumber(options.x);
  var y = asNumber(options.y);
  var width = asNumber(options.width);
  var height = asNumber(options.height);
  var borderWidth = asNumber(options.borderWidth);
  var padding = asNumber(options.padding);
  var clipX = x + borderWidth / 2 + padding;
  var clipY = y + borderWidth / 2 + padding;
  var clipWidth = width - (borderWidth / 2 + padding) * 2;
  var clipHeight = height - (borderWidth / 2 + padding) * 2;
  var clippingArea = [
    moveTo(clipX, clipY),
    lineTo(clipX, clipY + clipHeight),
    lineTo(clipX + clipWidth, clipY + clipHeight),
    lineTo(clipX + clipWidth, clipY),
    closePath(),
    clip(),
    endPath()
  ];
  var background = drawRectangle({
    x,
    y,
    width,
    height,
    borderWidth: options.borderWidth,
    color: options.color,
    borderColor: options.borderColor,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  var lines = drawTextLines(options.textLines, {
    color: options.textColor,
    font: options.font,
    size: options.fontSize,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  var markedContent = __spreadArrays([
    beginMarkedContent("Tx"),
    pushGraphicsState()
  ], lines, [
    popGraphicsState(),
    endMarkedContent()
  ]);
  return __spreadArrays([
    pushGraphicsState()
  ], background, clippingArea, markedContent, [
    popGraphicsState()
  ]);
};
var drawOptionList = function(options) {
  var x = asNumber(options.x);
  var y = asNumber(options.y);
  var width = asNumber(options.width);
  var height = asNumber(options.height);
  var lineHeight = asNumber(options.lineHeight);
  var borderWidth = asNumber(options.borderWidth);
  var padding = asNumber(options.padding);
  var clipX = x + borderWidth / 2 + padding;
  var clipY = y + borderWidth / 2 + padding;
  var clipWidth = width - (borderWidth / 2 + padding) * 2;
  var clipHeight = height - (borderWidth / 2 + padding) * 2;
  var clippingArea = [
    moveTo(clipX, clipY),
    lineTo(clipX, clipY + clipHeight),
    lineTo(clipX + clipWidth, clipY + clipHeight),
    lineTo(clipX + clipWidth, clipY),
    closePath(),
    clip(),
    endPath()
  ];
  var background = drawRectangle({
    x,
    y,
    width,
    height,
    borderWidth: options.borderWidth,
    color: options.color,
    borderColor: options.borderColor,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  var highlights = [];
  for (var idx = 0, len = options.selectedLines.length; idx < len; idx++) {
    var line = options.textLines[options.selectedLines[idx]];
    highlights.push.apply(highlights, drawRectangle({
      x: line.x - padding,
      y: line.y - (lineHeight - line.height) / 2,
      width: width - borderWidth,
      height: line.height + (lineHeight - line.height) / 2,
      borderWidth: 0,
      color: options.selectedColor,
      borderColor: void 0,
      rotate: degrees(0),
      xSkew: degrees(0),
      ySkew: degrees(0)
    }));
  }
  var lines = drawTextLines(options.textLines, {
    color: options.textColor,
    font: options.font,
    size: options.fontSize,
    rotate: degrees(0),
    xSkew: degrees(0),
    ySkew: degrees(0)
  });
  var markedContent = __spreadArrays([
    beginMarkedContent("Tx"),
    pushGraphicsState()
  ], lines, [
    popGraphicsState(),
    endMarkedContent()
  ]);
  return __spreadArrays([
    pushGraphicsState()
  ], background, highlights, clippingArea, markedContent, [
    popGraphicsState()
  ]);
};
var EncryptedPDFError = (
  /** @class */
  function(_super) {
    __extends(EncryptedPDFError2, _super);
    function EncryptedPDFError2() {
      var _this = this;
      var msg = "Input document to `PDFDocument.load` is encrypted. You can use `PDFDocument.load(..., { ignoreEncryption: true })` if you wish to load the document anyways.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return EncryptedPDFError2;
  }(Error)
);
var FontkitNotRegisteredError = (
  /** @class */
  function(_super) {
    __extends(FontkitNotRegisteredError2, _super);
    function FontkitNotRegisteredError2() {
      var _this = this;
      var msg = "Input to `PDFDocument.embedFont` was a custom font, but no `fontkit` instance was found. You must register a `fontkit` instance with `PDFDocument.registerFontkit(...)` before embedding custom fonts.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return FontkitNotRegisteredError2;
  }(Error)
);
var ForeignPageError = (
  /** @class */
  function(_super) {
    __extends(ForeignPageError2, _super);
    function ForeignPageError2() {
      var _this = this;
      var msg = "A `page` passed to `PDFDocument.addPage` or `PDFDocument.insertPage` was from a different (foreign) PDF document. If you want to copy pages from one PDFDocument to another, you must use `PDFDocument.copyPages(...)` to copy the pages before adding or inserting them.";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return ForeignPageError2;
  }(Error)
);
var RemovePageFromEmptyDocumentError = (
  /** @class */
  function(_super) {
    __extends(RemovePageFromEmptyDocumentError2, _super);
    function RemovePageFromEmptyDocumentError2() {
      var _this = this;
      var msg = "PDFDocument has no pages so `PDFDocument.removePage` cannot be called";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return RemovePageFromEmptyDocumentError2;
  }(Error)
);
var NoSuchFieldError = (
  /** @class */
  function(_super) {
    __extends(NoSuchFieldError2, _super);
    function NoSuchFieldError2(name) {
      var _this = this;
      var msg = 'PDFDocument has no form field with the name "' + name + '"';
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return NoSuchFieldError2;
  }(Error)
);
var UnexpectedFieldTypeError = (
  /** @class */
  function(_super) {
    __extends(UnexpectedFieldTypeError2, _super);
    function UnexpectedFieldTypeError2(name, expected, actual) {
      var _a2, _b2;
      var _this = this;
      var expectedType = expected === null || expected === void 0 ? void 0 : expected.name;
      var actualType = (_b2 = (_a2 = actual === null || actual === void 0 ? void 0 : actual.constructor) === null || _a2 === void 0 ? void 0 : _a2.name) !== null && _b2 !== void 0 ? _b2 : actual;
      var msg = 'Expected field "' + name + '" to be of type ' + expectedType + ", " + ("but it is actually of type " + actualType);
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return UnexpectedFieldTypeError2;
  }(Error)
);
(function(_super) {
  __extends(MissingOnValueCheckError, _super);
  function MissingOnValueCheckError(onValue) {
    var _this = this;
    var msg = 'Failed to select check box due to missing onValue: "' + onValue + '"';
    _this = _super.call(this, msg) || this;
    return _this;
  }
  return MissingOnValueCheckError;
})(Error);
var FieldAlreadyExistsError = (
  /** @class */
  function(_super) {
    __extends(FieldAlreadyExistsError2, _super);
    function FieldAlreadyExistsError2(name) {
      var _this = this;
      var msg = 'A field already exists with the specified name: "' + name + '"';
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return FieldAlreadyExistsError2;
  }(Error)
);
var InvalidFieldNamePartError = (
  /** @class */
  function(_super) {
    __extends(InvalidFieldNamePartError2, _super);
    function InvalidFieldNamePartError2(namePart) {
      var _this = this;
      var msg = 'Field name contains invalid component: "' + namePart + '"';
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidFieldNamePartError2;
  }(Error)
);
(function(_super) {
  __extends(FieldExistsAsNonTerminalError, _super);
  function FieldExistsAsNonTerminalError(name) {
    var _this = this;
    var msg = 'A non-terminal field already exists with the specified name: "' + name + '"';
    _this = _super.call(this, msg) || this;
    return _this;
  }
  return FieldExistsAsNonTerminalError;
})(Error);
var RichTextFieldReadError = (
  /** @class */
  function(_super) {
    __extends(RichTextFieldReadError2, _super);
    function RichTextFieldReadError2(fieldName) {
      var _this = this;
      var msg = "Reading rich text fields is not supported: Attempted to read rich text field: " + fieldName;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return RichTextFieldReadError2;
  }(Error)
);
var CombedTextLayoutError = (
  /** @class */
  function(_super) {
    __extends(CombedTextLayoutError2, _super);
    function CombedTextLayoutError2(lineLength, cellCount) {
      var _this = this;
      var msg = "Failed to layout combed text as lineLength=" + lineLength + " is greater than cellCount=" + cellCount;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return CombedTextLayoutError2;
  }(Error)
);
var ExceededMaxLengthError = (
  /** @class */
  function(_super) {
    __extends(ExceededMaxLengthError2, _super);
    function ExceededMaxLengthError2(textLength, maxLength, name) {
      var _this = this;
      var msg = "Attempted to set text with length=" + textLength + " for TextField with maxLength=" + maxLength + " and name=" + name;
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return ExceededMaxLengthError2;
  }(Error)
);
var InvalidMaxLengthError = (
  /** @class */
  function(_super) {
    __extends(InvalidMaxLengthError2, _super);
    function InvalidMaxLengthError2(textLength, maxLength, name) {
      var _this = this;
      var msg = "Attempted to set maxLength=" + maxLength + ", which is less than " + textLength + ", the length of this field's current value (name=" + name + ")";
      _this = _super.call(this, msg) || this;
      return _this;
    }
    return InvalidMaxLengthError2;
  }(Error)
);
var TextAlignment;
(function(TextAlignment2) {
  TextAlignment2[TextAlignment2["Left"] = 0] = "Left";
  TextAlignment2[TextAlignment2["Center"] = 1] = "Center";
  TextAlignment2[TextAlignment2["Right"] = 2] = "Right";
})(TextAlignment || (TextAlignment = {}));
var MIN_FONT_SIZE = 4;
var MAX_FONT_SIZE = 500;
var computeFontSize = function(lines, font, bounds, multiline) {
  if (multiline === void 0) {
    multiline = false;
  }
  var fontSize = MIN_FONT_SIZE;
  while (fontSize < MAX_FONT_SIZE) {
    var linesUsed = 0;
    for (var lineIdx = 0, lineLen = lines.length; lineIdx < lineLen; lineIdx++) {
      linesUsed += 1;
      var line = lines[lineIdx];
      var words = line.split(" ");
      var spaceInLineRemaining = bounds.width;
      for (var idx = 0, len = words.length; idx < len; idx++) {
        var isLastWord = idx === len - 1;
        var word = isLastWord ? words[idx] : words[idx] + " ";
        var widthOfWord = font.widthOfTextAtSize(word, fontSize);
        spaceInLineRemaining -= widthOfWord;
        if (spaceInLineRemaining <= 0) {
          linesUsed += 1;
          spaceInLineRemaining = bounds.width - widthOfWord;
        }
      }
    }
    if (!multiline && linesUsed > lines.length)
      return fontSize - 1;
    var height = font.heightAtSize(fontSize);
    var lineHeight = height + height * 0.2;
    var totalHeight = lineHeight * linesUsed;
    if (totalHeight > Math.abs(bounds.height))
      return fontSize - 1;
    fontSize += 1;
  }
  return fontSize;
};
var computeCombedFontSize = function(line, font, bounds, cellCount) {
  var cellWidth = bounds.width / cellCount;
  var cellHeight = bounds.height;
  var fontSize = MIN_FONT_SIZE;
  var chars2 = charSplit(line);
  while (fontSize < MAX_FONT_SIZE) {
    for (var idx = 0, len = chars2.length; idx < len; idx++) {
      var c = chars2[idx];
      var tooLong = font.widthOfTextAtSize(c, fontSize) > cellWidth * 0.75;
      if (tooLong)
        return fontSize - 1;
    }
    var height = font.heightAtSize(fontSize, { descender: false });
    if (height > cellHeight)
      return fontSize - 1;
    fontSize += 1;
  }
  return fontSize;
};
var lastIndexOfWhitespace = function(line) {
  for (var idx = line.length; idx > 0; idx--) {
    if (/\s/.test(line[idx]))
      return idx;
  }
  return void 0;
};
var splitOutLines = function(input, maxWidth, font, fontSize) {
  var _a2;
  var lastWhitespaceIdx = input.length;
  while (lastWhitespaceIdx > 0) {
    var line = input.substring(0, lastWhitespaceIdx);
    var encoded = font.encodeText(line);
    var width = font.widthOfTextAtSize(line, fontSize);
    if (width < maxWidth) {
      var remainder = input.substring(lastWhitespaceIdx) || void 0;
      return { line, encoded, width, remainder };
    }
    lastWhitespaceIdx = (_a2 = lastIndexOfWhitespace(line)) !== null && _a2 !== void 0 ? _a2 : 0;
  }
  return {
    line: input,
    encoded: font.encodeText(input),
    width: font.widthOfTextAtSize(input, fontSize),
    remainder: void 0
  };
};
var layoutMultilineText = function(text, _a2) {
  var alignment = _a2.alignment, fontSize = _a2.fontSize, font = _a2.font, bounds = _a2.bounds;
  var lines = lineSplit(cleanText(text));
  if (fontSize === void 0 || fontSize === 0) {
    fontSize = computeFontSize(lines, font, bounds, true);
  }
  var height = font.heightAtSize(fontSize);
  var lineHeight = height + height * 0.2;
  var textLines = [];
  var minX = bounds.x;
  var minY = bounds.y;
  var maxX = bounds.x + bounds.width;
  var maxY = bounds.y + bounds.height;
  var y = bounds.y + bounds.height;
  for (var idx = 0, len = lines.length; idx < len; idx++) {
    var prevRemainder = lines[idx];
    while (prevRemainder !== void 0) {
      var _b2 = splitOutLines(prevRemainder, bounds.width, font, fontSize), line = _b2.line, encoded = _b2.encoded, width = _b2.width, remainder = _b2.remainder;
      var x = alignment === TextAlignment.Left ? bounds.x : alignment === TextAlignment.Center ? bounds.x + bounds.width / 2 - width / 2 : alignment === TextAlignment.Right ? bounds.x + bounds.width - width : bounds.x;
      y -= lineHeight;
      if (x < minX)
        minX = x;
      if (y < minY)
        minY = y;
      if (x + width > maxX)
        maxX = x + width;
      if (y + height > maxY)
        maxY = y + height;
      textLines.push({ text: line, encoded, width, height, x, y });
      prevRemainder = remainder === null || remainder === void 0 ? void 0 : remainder.trim();
    }
  }
  return {
    fontSize,
    lineHeight,
    lines: textLines,
    bounds: {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  };
};
var layoutCombedText = function(text, _a2) {
  var fontSize = _a2.fontSize, font = _a2.font, bounds = _a2.bounds, cellCount = _a2.cellCount;
  var line = mergeLines(cleanText(text));
  if (line.length > cellCount) {
    throw new CombedTextLayoutError(line.length, cellCount);
  }
  if (fontSize === void 0 || fontSize === 0) {
    fontSize = computeCombedFontSize(line, font, bounds, cellCount);
  }
  var cellWidth = bounds.width / cellCount;
  var height = font.heightAtSize(fontSize, { descender: false });
  var y = bounds.y + (bounds.height / 2 - height / 2);
  var cells = [];
  var minX = bounds.x;
  var minY = bounds.y;
  var maxX = bounds.x + bounds.width;
  var maxY = bounds.y + bounds.height;
  var cellOffset = 0;
  var charOffset = 0;
  while (cellOffset < cellCount) {
    var _b2 = charAtIndex(line, charOffset), char = _b2[0], charLength = _b2[1];
    var encoded = font.encodeText(char);
    var width = font.widthOfTextAtSize(char, fontSize);
    var cellCenter = bounds.x + (cellWidth * cellOffset + cellWidth / 2);
    var x = cellCenter - width / 2;
    if (x < minX)
      minX = x;
    if (y < minY)
      minY = y;
    if (x + width > maxX)
      maxX = x + width;
    if (y + height > maxY)
      maxY = y + height;
    cells.push({ text: line, encoded, width, height, x, y });
    cellOffset += 1;
    charOffset += charLength;
  }
  return {
    fontSize,
    cells,
    bounds: {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  };
};
var layoutSinglelineText = function(text, _a2) {
  var alignment = _a2.alignment, fontSize = _a2.fontSize, font = _a2.font, bounds = _a2.bounds;
  var line = mergeLines(cleanText(text));
  if (fontSize === void 0 || fontSize === 0) {
    fontSize = computeFontSize([line], font, bounds);
  }
  var encoded = font.encodeText(line);
  var width = font.widthOfTextAtSize(line, fontSize);
  var height = font.heightAtSize(fontSize, { descender: false });
  var x = alignment === TextAlignment.Left ? bounds.x : alignment === TextAlignment.Center ? bounds.x + bounds.width / 2 - width / 2 : alignment === TextAlignment.Right ? bounds.x + bounds.width - width : bounds.x;
  var y = bounds.y + (bounds.height / 2 - height / 2);
  return {
    fontSize,
    line: { text: line, encoded, width, height, x, y },
    bounds: { x, y, width, height }
  };
};
var normalizeAppearance = function(appearance) {
  if ("normal" in appearance)
    return appearance;
  return { normal: appearance };
};
var tfRegex = /\/([^\0\t\n\f\r\ ]+)[\0\t\n\f\r\ ]+(\d*\.\d+|\d+)[\0\t\n\f\r\ ]+Tf/;
var getDefaultFontSize = function(field) {
  var _a2, _b2;
  var da = (_a2 = field.getDefaultAppearance()) !== null && _a2 !== void 0 ? _a2 : "";
  var daMatch = (_b2 = findLastMatch(da, tfRegex).match) !== null && _b2 !== void 0 ? _b2 : [];
  var defaultFontSize = Number(daMatch[2]);
  return isFinite(defaultFontSize) ? defaultFontSize : void 0;
};
var colorRegex = /(\d*\.\d+|\d+)[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]*(\d*\.\d+|\d+)?[\0\t\n\f\r\ ]+(g|rg|k)/;
var getDefaultColor = function(field) {
  var _a2;
  var da = (_a2 = field.getDefaultAppearance()) !== null && _a2 !== void 0 ? _a2 : "";
  var daMatch = findLastMatch(da, colorRegex).match;
  var _b2 = daMatch !== null && daMatch !== void 0 ? daMatch : [], c1 = _b2[1], c2 = _b2[2], c3 = _b2[3], c4 = _b2[4], colorSpace = _b2[5];
  if (colorSpace === "g" && c1) {
    return grayscale(Number(c1));
  }
  if (colorSpace === "rg" && c1 && c2 && c3) {
    return rgb(Number(c1), Number(c2), Number(c3));
  }
  if (colorSpace === "k" && c1 && c2 && c3 && c4) {
    return cmyk(Number(c1), Number(c2), Number(c3), Number(c4));
  }
  return void 0;
};
var updateDefaultAppearance = function(field, color, font, fontSize) {
  var _a2;
  if (fontSize === void 0) {
    fontSize = 0;
  }
  var da = [
    setFillingColor(color).toString(),
    setFontAndSize((_a2 = font === null || font === void 0 ? void 0 : font.name) !== null && _a2 !== void 0 ? _a2 : "dummy__noop", fontSize).toString()
  ].join("\n");
  field.setDefaultAppearance(da);
};
var defaultCheckBoxAppearanceProvider = function(checkBox, widget) {
  var _a2, _b2, _c;
  var widgetColor = getDefaultColor(widget);
  var fieldColor = getDefaultColor(checkBox.acroField);
  var rectangle = widget.getRectangle();
  var ap = widget.getAppearanceCharacteristics();
  var bs = widget.getBorderStyle();
  var borderWidth = (_a2 = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a2 !== void 0 ? _a2 : 0;
  var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
  var _d = adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
  var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
  var black = rgb(0, 0, 0);
  var borderColor = (_b2 = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor())) !== null && _b2 !== void 0 ? _b2 : black;
  var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
  var downBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), 0.8);
  var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
  if (widgetColor) {
    updateDefaultAppearance(widget, textColor);
  } else {
    updateDefaultAppearance(checkBox.acroField, textColor);
  }
  var options = {
    x: 0 + borderWidth / 2,
    y: 0 + borderWidth / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    thickness: 1.5,
    borderWidth,
    borderColor,
    markColor: textColor
  };
  return {
    normal: {
      on: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), { color: normalBackgroundColor, filled: true }))),
      off: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), { color: normalBackgroundColor, filled: false })))
    },
    down: {
      on: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), { color: downBackgroundColor, filled: true }))),
      off: __spreadArrays(rotate, drawCheckBox(__assign(__assign({}, options), { color: downBackgroundColor, filled: false })))
    }
  };
};
var defaultRadioGroupAppearanceProvider = function(radioGroup, widget) {
  var _a2, _b2, _c;
  var widgetColor = getDefaultColor(widget);
  var fieldColor = getDefaultColor(radioGroup.acroField);
  var rectangle = widget.getRectangle();
  var ap = widget.getAppearanceCharacteristics();
  var bs = widget.getBorderStyle();
  var borderWidth = (_a2 = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a2 !== void 0 ? _a2 : 0;
  var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
  var _d = adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
  var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
  var black = rgb(0, 0, 0);
  var borderColor = (_b2 = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor())) !== null && _b2 !== void 0 ? _b2 : black;
  var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
  var downBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), 0.8);
  var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
  if (widgetColor) {
    updateDefaultAppearance(widget, textColor);
  } else {
    updateDefaultAppearance(radioGroup.acroField, textColor);
  }
  var options = {
    x: width / 2,
    y: height / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    borderWidth,
    borderColor,
    dotColor: textColor
  };
  return {
    normal: {
      on: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), { color: normalBackgroundColor, filled: true }))),
      off: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), { color: normalBackgroundColor, filled: false })))
    },
    down: {
      on: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), { color: downBackgroundColor, filled: true }))),
      off: __spreadArrays(rotate, drawRadioButton(__assign(__assign({}, options), { color: downBackgroundColor, filled: false })))
    }
  };
};
var defaultButtonAppearanceProvider = function(button, widget, font) {
  var _a2, _b2, _c, _d, _e;
  var widgetColor = getDefaultColor(widget);
  var fieldColor = getDefaultColor(button.acroField);
  var widgetFontSize = getDefaultFontSize(widget);
  var fieldFontSize = getDefaultFontSize(button.acroField);
  var rectangle = widget.getRectangle();
  var ap = widget.getAppearanceCharacteristics();
  var bs = widget.getBorderStyle();
  var captions = ap === null || ap === void 0 ? void 0 : ap.getCaptions();
  var normalText = (_a2 = captions === null || captions === void 0 ? void 0 : captions.normal) !== null && _a2 !== void 0 ? _a2 : "";
  var downText = (_c = (_b2 = captions === null || captions === void 0 ? void 0 : captions.down) !== null && _b2 !== void 0 ? _b2 : normalText) !== null && _c !== void 0 ? _c : "";
  var borderWidth = (_d = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _d !== void 0 ? _d : 0;
  var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
  var _f = adjustDimsForRotation(rectangle, rotation), width = _f.width, height = _f.height;
  var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
  var black = rgb(0, 0, 0);
  var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
  var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
  var downBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor(), 0.8);
  var bounds = {
    x: borderWidth,
    y: borderWidth,
    width: width - borderWidth * 2,
    height: height - borderWidth * 2
  };
  var normalLayout = layoutSinglelineText(normalText, {
    alignment: TextAlignment.Center,
    fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
    font,
    bounds
  });
  var downLayout = layoutSinglelineText(downText, {
    alignment: TextAlignment.Center,
    fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
    font,
    bounds
  });
  var fontSize = Math.min(normalLayout.fontSize, downLayout.fontSize);
  var textColor = (_e = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _e !== void 0 ? _e : black;
  if (widgetColor || widgetFontSize !== void 0) {
    updateDefaultAppearance(widget, textColor, font, fontSize);
  } else {
    updateDefaultAppearance(button.acroField, textColor, font, fontSize);
  }
  var options = {
    x: 0 + borderWidth / 2,
    y: 0 + borderWidth / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    borderWidth,
    borderColor,
    textColor,
    font: font.name,
    fontSize
  };
  return {
    normal: __spreadArrays(rotate, drawButton(__assign(__assign({}, options), { color: normalBackgroundColor, textLines: [normalLayout.line] }))),
    down: __spreadArrays(rotate, drawButton(__assign(__assign({}, options), { color: downBackgroundColor, textLines: [downLayout.line] })))
  };
};
var defaultTextFieldAppearanceProvider = function(textField, widget, font) {
  var _a2, _b2, _c, _d;
  var widgetColor = getDefaultColor(widget);
  var fieldColor = getDefaultColor(textField.acroField);
  var widgetFontSize = getDefaultFontSize(widget);
  var fieldFontSize = getDefaultFontSize(textField.acroField);
  var rectangle = widget.getRectangle();
  var ap = widget.getAppearanceCharacteristics();
  var bs = widget.getBorderStyle();
  var text = (_a2 = textField.getText()) !== null && _a2 !== void 0 ? _a2 : "";
  var borderWidth = (_b2 = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b2 !== void 0 ? _b2 : 0;
  var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
  var _e = adjustDimsForRotation(rectangle, rotation), width = _e.width, height = _e.height;
  var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
  var black = rgb(0, 0, 0);
  var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
  var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
  var textLines;
  var fontSize;
  var padding = textField.isCombed() ? 0 : 1;
  var bounds = {
    x: borderWidth + padding,
    y: borderWidth + padding,
    width: width - (borderWidth + padding) * 2,
    height: height - (borderWidth + padding) * 2
  };
  if (textField.isMultiline()) {
    var layout = layoutMultilineText(text, {
      alignment: textField.getAlignment(),
      fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
      font,
      bounds
    });
    textLines = layout.lines;
    fontSize = layout.fontSize;
  } else if (textField.isCombed()) {
    var layout = layoutCombedText(text, {
      fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
      font,
      bounds,
      cellCount: (_c = textField.getMaxLength()) !== null && _c !== void 0 ? _c : 0
    });
    textLines = layout.cells;
    fontSize = layout.fontSize;
  } else {
    var layout = layoutSinglelineText(text, {
      alignment: textField.getAlignment(),
      fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
      font,
      bounds
    });
    textLines = [layout.line];
    fontSize = layout.fontSize;
  }
  var textColor = (_d = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _d !== void 0 ? _d : black;
  if (widgetColor || widgetFontSize !== void 0) {
    updateDefaultAppearance(widget, textColor, font, fontSize);
  } else {
    updateDefaultAppearance(textField.acroField, textColor, font, fontSize);
  }
  var options = {
    x: 0 + borderWidth / 2,
    y: 0 + borderWidth / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
    borderColor,
    textColor,
    font: font.name,
    fontSize,
    color: normalBackgroundColor,
    textLines,
    padding
  };
  return __spreadArrays(rotate, drawTextField(options));
};
var defaultDropdownAppearanceProvider = function(dropdown, widget, font) {
  var _a2, _b2, _c;
  var widgetColor = getDefaultColor(widget);
  var fieldColor = getDefaultColor(dropdown.acroField);
  var widgetFontSize = getDefaultFontSize(widget);
  var fieldFontSize = getDefaultFontSize(dropdown.acroField);
  var rectangle = widget.getRectangle();
  var ap = widget.getAppearanceCharacteristics();
  var bs = widget.getBorderStyle();
  var text = (_a2 = dropdown.getSelected()[0]) !== null && _a2 !== void 0 ? _a2 : "";
  var borderWidth = (_b2 = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b2 !== void 0 ? _b2 : 0;
  var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
  var _d = adjustDimsForRotation(rectangle, rotation), width = _d.width, height = _d.height;
  var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
  var black = rgb(0, 0, 0);
  var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
  var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
  var padding = 1;
  var bounds = {
    x: borderWidth + padding,
    y: borderWidth + padding,
    width: width - (borderWidth + padding) * 2,
    height: height - (borderWidth + padding) * 2
  };
  var _e = layoutSinglelineText(text, {
    alignment: TextAlignment.Left,
    fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
    font,
    bounds
  }), line = _e.line, fontSize = _e.fontSize;
  var textColor = (_c = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _c !== void 0 ? _c : black;
  if (widgetColor || widgetFontSize !== void 0) {
    updateDefaultAppearance(widget, textColor, font, fontSize);
  } else {
    updateDefaultAppearance(dropdown.acroField, textColor, font, fontSize);
  }
  var options = {
    x: 0 + borderWidth / 2,
    y: 0 + borderWidth / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
    borderColor,
    textColor,
    font: font.name,
    fontSize,
    color: normalBackgroundColor,
    textLines: [line],
    padding
  };
  return __spreadArrays(rotate, drawTextField(options));
};
var defaultOptionListAppearanceProvider = function(optionList, widget, font) {
  var _a2, _b2;
  var widgetColor = getDefaultColor(widget);
  var fieldColor = getDefaultColor(optionList.acroField);
  var widgetFontSize = getDefaultFontSize(widget);
  var fieldFontSize = getDefaultFontSize(optionList.acroField);
  var rectangle = widget.getRectangle();
  var ap = widget.getAppearanceCharacteristics();
  var bs = widget.getBorderStyle();
  var borderWidth = (_a2 = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _a2 !== void 0 ? _a2 : 0;
  var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
  var _c = adjustDimsForRotation(rectangle, rotation), width = _c.width, height = _c.height;
  var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
  var black = rgb(0, 0, 0);
  var borderColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBorderColor());
  var normalBackgroundColor = componentsToColor(ap === null || ap === void 0 ? void 0 : ap.getBackgroundColor());
  var options = optionList.getOptions();
  var selected = optionList.getSelected();
  if (optionList.isSorted())
    options.sort();
  var text = "";
  for (var idx = 0, len = options.length; idx < len; idx++) {
    text += options[idx];
    if (idx < len - 1)
      text += "\n";
  }
  var padding = 1;
  var bounds = {
    x: borderWidth + padding,
    y: borderWidth + padding,
    width: width - (borderWidth + padding) * 2,
    height: height - (borderWidth + padding) * 2
  };
  var _d = layoutMultilineText(text, {
    alignment: TextAlignment.Left,
    fontSize: widgetFontSize !== null && widgetFontSize !== void 0 ? widgetFontSize : fieldFontSize,
    font,
    bounds
  }), lines = _d.lines, fontSize = _d.fontSize, lineHeight = _d.lineHeight;
  var selectedLines = [];
  for (var idx = 0, len = lines.length; idx < len; idx++) {
    var line = lines[idx];
    if (selected.includes(line.text))
      selectedLines.push(idx);
  }
  var blue = rgb(153 / 255, 193 / 255, 218 / 255);
  var textColor = (_b2 = widgetColor !== null && widgetColor !== void 0 ? widgetColor : fieldColor) !== null && _b2 !== void 0 ? _b2 : black;
  if (widgetColor || widgetFontSize !== void 0) {
    updateDefaultAppearance(widget, textColor, font, fontSize);
  } else {
    updateDefaultAppearance(optionList.acroField, textColor, font, fontSize);
  }
  return __spreadArrays(rotate, drawOptionList({
    x: 0 + borderWidth / 2,
    y: 0 + borderWidth / 2,
    width: width - borderWidth,
    height: height - borderWidth,
    borderWidth: borderWidth !== null && borderWidth !== void 0 ? borderWidth : 0,
    borderColor,
    textColor,
    font: font.name,
    fontSize,
    color: normalBackgroundColor,
    textLines: lines,
    lineHeight,
    selectedColor: blue,
    selectedLines,
    padding
  }));
};
var PDFEmbeddedPage = (
  /** @class */
  function() {
    function PDFEmbeddedPage2(ref, doc, embedder) {
      this.alreadyEmbedded = false;
      assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      assertIs(embedder, "embedder", [[PDFPageEmbedder, "PDFPageEmbedder"]]);
      this.ref = ref;
      this.doc = doc;
      this.width = embedder.width;
      this.height = embedder.height;
      this.embedder = embedder;
    }
    PDFEmbeddedPage2.prototype.scale = function(factor) {
      assertIs(factor, "factor", ["number"]);
      return { width: this.width * factor, height: this.height * factor };
    };
    PDFEmbeddedPage2.prototype.size = function() {
      return this.scale(1);
    };
    PDFEmbeddedPage2.prototype.embed = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (!!this.alreadyEmbedded) return [3, 2];
              return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
            case 1:
              _a2.sent();
              this.alreadyEmbedded = true;
              _a2.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFEmbeddedPage2.of = function(ref, doc, embedder) {
      return new PDFEmbeddedPage2(ref, doc, embedder);
    };
    return PDFEmbeddedPage2;
  }()
);
var PDFFont = (
  /** @class */
  function() {
    function PDFFont2(ref, doc, embedder) {
      this.modified = true;
      assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      assertIs(embedder, "embedder", [
        [CustomFontEmbedder, "CustomFontEmbedder"],
        [StandardFontEmbedder, "StandardFontEmbedder"]
      ]);
      this.ref = ref;
      this.doc = doc;
      this.name = embedder.fontName;
      this.embedder = embedder;
    }
    PDFFont2.prototype.encodeText = function(text) {
      assertIs(text, "text", ["string"]);
      this.modified = true;
      return this.embedder.encodeText(text);
    };
    PDFFont2.prototype.widthOfTextAtSize = function(text, size) {
      assertIs(text, "text", ["string"]);
      assertIs(size, "size", ["number"]);
      return this.embedder.widthOfTextAtSize(text, size);
    };
    PDFFont2.prototype.heightAtSize = function(size, options) {
      var _a2;
      assertIs(size, "size", ["number"]);
      assertOrUndefined(options === null || options === void 0 ? void 0 : options.descender, "options.descender", ["boolean"]);
      return this.embedder.heightOfFontAtSize(size, {
        descender: (_a2 = options === null || options === void 0 ? void 0 : options.descender) !== null && _a2 !== void 0 ? _a2 : true
      });
    };
    PDFFont2.prototype.sizeAtHeight = function(height) {
      assertIs(height, "height", ["number"]);
      return this.embedder.sizeOfFontAtHeight(height);
    };
    PDFFont2.prototype.getCharacterSet = function() {
      if (this.embedder instanceof StandardFontEmbedder) {
        return this.embedder.encoding.supportedCodePoints;
      } else {
        return this.embedder.font.characterSet;
      }
    };
    PDFFont2.prototype.embed = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (!this.modified) return [3, 2];
              return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
            case 1:
              _a2.sent();
              this.modified = false;
              _a2.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFFont2.of = function(ref, doc, embedder) {
      return new PDFFont2(ref, doc, embedder);
    };
    return PDFFont2;
  }()
);
var PDFImage = (
  /** @class */
  function() {
    function PDFImage2(ref, doc, embedder) {
      assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      assertIs(embedder, "embedder", [
        [JpegEmbedder, "JpegEmbedder"],
        [PngEmbedder, "PngEmbedder"]
      ]);
      this.ref = ref;
      this.doc = doc;
      this.width = embedder.width;
      this.height = embedder.height;
      this.embedder = embedder;
    }
    PDFImage2.prototype.scale = function(factor) {
      assertIs(factor, "factor", ["number"]);
      return { width: this.width * factor, height: this.height * factor };
    };
    PDFImage2.prototype.scaleToFit = function(width, height) {
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var imgWidthScale = width / this.width;
      var imgHeightScale = height / this.height;
      var scale2 = Math.min(imgWidthScale, imgHeightScale);
      return this.scale(scale2);
    };
    PDFImage2.prototype.size = function() {
      return this.scale(1);
    };
    PDFImage2.prototype.embed = function() {
      return __awaiter(this, void 0, void 0, function() {
        var _a2, doc, ref;
        return __generator(this, function(_b2) {
          switch (_b2.label) {
            case 0:
              if (!this.embedder)
                return [
                  2
                  /*return*/
                ];
              if (!this.embedTask) {
                _a2 = this, doc = _a2.doc, ref = _a2.ref;
                this.embedTask = this.embedder.embedIntoContext(doc.context, ref);
              }
              return [4, this.embedTask];
            case 1:
              _b2.sent();
              this.embedder = void 0;
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFImage2.of = function(ref, doc, embedder) {
      return new PDFImage2(ref, doc, embedder);
    };
    return PDFImage2;
  }()
);
var ImageAlignment;
(function(ImageAlignment2) {
  ImageAlignment2[ImageAlignment2["Left"] = 0] = "Left";
  ImageAlignment2[ImageAlignment2["Center"] = 1] = "Center";
  ImageAlignment2[ImageAlignment2["Right"] = 2] = "Right";
})(ImageAlignment || (ImageAlignment = {}));
var assertFieldAppearanceOptions = function(options) {
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.x, "options.x", ["number"]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.y, "options.y", ["number"]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.width, "options.width", ["number"]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.height, "options.height", ["number"]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.textColor, "options.textColor", [
    [Object, "Color"]
  ]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.backgroundColor, "options.backgroundColor", [
    [Object, "Color"]
  ]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.borderColor, "options.borderColor", [
    [Object, "Color"]
  ]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.borderWidth, "options.borderWidth", ["number"]);
  assertOrUndefined(options === null || options === void 0 ? void 0 : options.rotate, "options.rotate", [[Object, "Rotation"]]);
};
var PDFField = (
  /** @class */
  function() {
    function PDFField2(acroField, ref, doc) {
      assertIs(acroField, "acroField", [[PDFAcroTerminal, "PDFAcroTerminal"]]);
      assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      this.acroField = acroField;
      this.ref = ref;
      this.doc = doc;
    }
    PDFField2.prototype.getName = function() {
      var _a2;
      return (_a2 = this.acroField.getFullyQualifiedName()) !== null && _a2 !== void 0 ? _a2 : "";
    };
    PDFField2.prototype.isReadOnly = function() {
      return this.acroField.hasFlag(AcroFieldFlags.ReadOnly);
    };
    PDFField2.prototype.enableReadOnly = function() {
      this.acroField.setFlagTo(AcroFieldFlags.ReadOnly, true);
    };
    PDFField2.prototype.disableReadOnly = function() {
      this.acroField.setFlagTo(AcroFieldFlags.ReadOnly, false);
    };
    PDFField2.prototype.isRequired = function() {
      return this.acroField.hasFlag(AcroFieldFlags.Required);
    };
    PDFField2.prototype.enableRequired = function() {
      this.acroField.setFlagTo(AcroFieldFlags.Required, true);
    };
    PDFField2.prototype.disableRequired = function() {
      this.acroField.setFlagTo(AcroFieldFlags.Required, false);
    };
    PDFField2.prototype.isExported = function() {
      return !this.acroField.hasFlag(AcroFieldFlags.NoExport);
    };
    PDFField2.prototype.enableExporting = function() {
      this.acroField.setFlagTo(AcroFieldFlags.NoExport, false);
    };
    PDFField2.prototype.disableExporting = function() {
      this.acroField.setFlagTo(AcroFieldFlags.NoExport, true);
    };
    PDFField2.prototype.needsAppearancesUpdate = function() {
      throw new MethodNotImplementedError(this.constructor.name, "needsAppearancesUpdate");
    };
    PDFField2.prototype.defaultUpdateAppearances = function(_font) {
      throw new MethodNotImplementedError(this.constructor.name, "defaultUpdateAppearances");
    };
    PDFField2.prototype.markAsDirty = function() {
      this.doc.getForm().markFieldAsDirty(this.ref);
    };
    PDFField2.prototype.markAsClean = function() {
      this.doc.getForm().markFieldAsClean(this.ref);
    };
    PDFField2.prototype.isDirty = function() {
      return this.doc.getForm().fieldIsDirty(this.ref);
    };
    PDFField2.prototype.createWidget = function(options) {
      var _a2;
      var textColor = options.textColor;
      var backgroundColor = options.backgroundColor;
      var borderColor = options.borderColor;
      var borderWidth = options.borderWidth;
      var degreesAngle = toDegrees(options.rotate);
      var caption = options.caption;
      var x = options.x;
      var y = options.y;
      var width = options.width + borderWidth;
      var height = options.height + borderWidth;
      var hidden = Boolean(options.hidden);
      var pageRef = options.page;
      assertMultiple(degreesAngle, "degreesAngle", 90);
      var widget = PDFWidgetAnnotation.create(this.doc.context, this.ref);
      var rect = rotateRectangle({ x, y, width, height }, borderWidth, degreesAngle);
      widget.setRectangle(rect);
      if (pageRef)
        widget.setP(pageRef);
      var ac = widget.getOrCreateAppearanceCharacteristics();
      if (backgroundColor) {
        ac.setBackgroundColor(colorToComponents(backgroundColor));
      }
      ac.setRotation(degreesAngle);
      if (caption)
        ac.setCaptions({ normal: caption });
      if (borderColor)
        ac.setBorderColor(colorToComponents(borderColor));
      var bs = widget.getOrCreateBorderStyle();
      if (borderWidth !== void 0)
        bs.setWidth(borderWidth);
      widget.setFlagTo(AnnotationFlags.Print, true);
      widget.setFlagTo(AnnotationFlags.Hidden, hidden);
      widget.setFlagTo(AnnotationFlags.Invisible, false);
      if (textColor) {
        var da = (_a2 = this.acroField.getDefaultAppearance()) !== null && _a2 !== void 0 ? _a2 : "";
        var newDa = da + "\n" + setFillingColor(textColor).toString();
        this.acroField.setDefaultAppearance(newDa);
      }
      return widget;
    };
    PDFField2.prototype.updateWidgetAppearanceWithFont = function(widget, font, _a2) {
      var normal = _a2.normal, rollover = _a2.rollover, down = _a2.down;
      this.updateWidgetAppearances(widget, {
        normal: this.createAppearanceStream(widget, normal, font),
        rollover: rollover && this.createAppearanceStream(widget, rollover, font),
        down: down && this.createAppearanceStream(widget, down, font)
      });
    };
    PDFField2.prototype.updateOnOffWidgetAppearance = function(widget, onValue, _a2) {
      var normal = _a2.normal, rollover = _a2.rollover, down = _a2.down;
      this.updateWidgetAppearances(widget, {
        normal: this.createAppearanceDict(widget, normal, onValue),
        rollover: rollover && this.createAppearanceDict(widget, rollover, onValue),
        down: down && this.createAppearanceDict(widget, down, onValue)
      });
    };
    PDFField2.prototype.updateWidgetAppearances = function(widget, _a2) {
      var normal = _a2.normal, rollover = _a2.rollover, down = _a2.down;
      widget.setNormalAppearance(normal);
      if (rollover) {
        widget.setRolloverAppearance(rollover);
      } else {
        widget.removeRolloverAppearance();
      }
      if (down) {
        widget.setDownAppearance(down);
      } else {
        widget.removeDownAppearance();
      }
    };
    PDFField2.prototype.createAppearanceStream = function(widget, appearance, font) {
      var _a2;
      var context = this.acroField.dict.context;
      var _b2 = widget.getRectangle(), width = _b2.width, height = _b2.height;
      var Resources = font && { Font: (_a2 = {}, _a2[font.name] = font.ref, _a2) };
      var stream2 = context.formXObject(appearance, {
        Resources,
        BBox: context.obj([0, 0, width, height]),
        Matrix: context.obj([1, 0, 0, 1, 0, 0])
      });
      var streamRef = context.register(stream2);
      return streamRef;
    };
    PDFField2.prototype.createImageAppearanceStream = function(widget, image, alignment) {
      var _a2;
      var _b2;
      var context = this.acroField.dict.context;
      var rectangle = widget.getRectangle();
      var ap = widget.getAppearanceCharacteristics();
      var bs = widget.getBorderStyle();
      var borderWidth = (_b2 = bs === null || bs === void 0 ? void 0 : bs.getWidth()) !== null && _b2 !== void 0 ? _b2 : 0;
      var rotation = reduceRotation(ap === null || ap === void 0 ? void 0 : ap.getRotation());
      var rotate = rotateInPlace(__assign(__assign({}, rectangle), { rotation }));
      var adj = adjustDimsForRotation(rectangle, rotation);
      var imageDims = image.scaleToFit(adj.width - borderWidth * 2, adj.height - borderWidth * 2);
      var options = {
        x: borderWidth,
        y: borderWidth,
        width: imageDims.width,
        height: imageDims.height,
        //
        rotate: degrees(0),
        xSkew: degrees(0),
        ySkew: degrees(0)
      };
      if (alignment === ImageAlignment.Center) {
        options.x += (adj.width - borderWidth * 2) / 2 - imageDims.width / 2;
        options.y += (adj.height - borderWidth * 2) / 2 - imageDims.height / 2;
      } else if (alignment === ImageAlignment.Right) {
        options.x = adj.width - borderWidth - imageDims.width;
        options.y = adj.height - borderWidth - imageDims.height;
      }
      var imageName = this.doc.context.addRandomSuffix("Image", 10);
      var appearance = __spreadArrays(rotate, drawImage(imageName, options));
      var Resources = { XObject: (_a2 = {}, _a2[imageName] = image.ref, _a2) };
      var stream2 = context.formXObject(appearance, {
        Resources,
        BBox: context.obj([0, 0, rectangle.width, rectangle.height]),
        Matrix: context.obj([1, 0, 0, 1, 0, 0])
      });
      return context.register(stream2);
    };
    PDFField2.prototype.createAppearanceDict = function(widget, appearance, onValue) {
      var context = this.acroField.dict.context;
      var onStreamRef = this.createAppearanceStream(widget, appearance.on);
      var offStreamRef = this.createAppearanceStream(widget, appearance.off);
      var appearanceDict = context.obj({});
      appearanceDict.set(onValue, onStreamRef);
      appearanceDict.set(PDFName.of("Off"), offStreamRef);
      return appearanceDict;
    };
    return PDFField2;
  }()
);
var PDFCheckBox = (
  /** @class */
  function(_super) {
    __extends(PDFCheckBox2, _super);
    function PDFCheckBox2(acroCheckBox, ref, doc) {
      var _this = _super.call(this, acroCheckBox, ref, doc) || this;
      assertIs(acroCheckBox, "acroCheckBox", [
        [PDFAcroCheckBox, "PDFAcroCheckBox"]
      ]);
      _this.acroField = acroCheckBox;
      return _this;
    }
    PDFCheckBox2.prototype.check = function() {
      var _a2;
      var onValue = (_a2 = this.acroField.getOnValue()) !== null && _a2 !== void 0 ? _a2 : PDFName.of("Yes");
      this.markAsDirty();
      this.acroField.setValue(onValue);
    };
    PDFCheckBox2.prototype.uncheck = function() {
      this.markAsDirty();
      this.acroField.setValue(PDFName.of("Off"));
    };
    PDFCheckBox2.prototype.isChecked = function() {
      var onValue = this.acroField.getOnValue();
      return !!onValue && onValue === this.acroField.getValue();
    };
    PDFCheckBox2.prototype.addToPage = function(page, options) {
      var _a2, _b2, _c, _d, _e, _f;
      assertIs(page, "page", [[PDFPage, "PDFPage"]]);
      assertFieldAppearanceOptions(options);
      if (!options)
        options = {};
      if (!("textColor" in options))
        options.textColor = rgb(0, 0, 0);
      if (!("backgroundColor" in options))
        options.backgroundColor = rgb(1, 1, 1);
      if (!("borderColor" in options))
        options.borderColor = rgb(0, 0, 0);
      if (!("borderWidth" in options))
        options.borderWidth = 1;
      var widget = this.createWidget({
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : 0,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : 0,
        width: (_c = options.width) !== null && _c !== void 0 ? _c : 50,
        height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
        textColor: options.textColor,
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
        rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
        hidden: options.hidden,
        page: page.ref
      });
      var widgetRef = this.doc.context.register(widget.dict);
      this.acroField.addWidget(widgetRef);
      widget.setAppearanceState(PDFName.of("Off"));
      this.updateWidgetAppearance(widget, PDFName.of("Yes"));
      page.node.addAnnot(widgetRef);
    };
    PDFCheckBox2.prototype.needsAppearancesUpdate = function() {
      var _a2;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var state = widget.getAppearanceState();
        var normal = (_a2 = widget.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal;
        if (!(normal instanceof PDFDict))
          return true;
        if (state && !normal.has(state))
          return true;
      }
      return false;
    };
    PDFCheckBox2.prototype.defaultUpdateAppearances = function() {
      this.updateAppearances();
    };
    PDFCheckBox2.prototype.updateAppearances = function(provider) {
      var _a2;
      assertOrUndefined(provider, "provider", [Function]);
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var onValue = (_a2 = widget.getOnValue()) !== null && _a2 !== void 0 ? _a2 : PDFName.of("Yes");
        if (!onValue)
          continue;
        this.updateWidgetAppearance(widget, onValue, provider);
      }
      this.markAsClean();
    };
    PDFCheckBox2.prototype.updateWidgetAppearance = function(widget, onValue, provider) {
      var apProvider = provider !== null && provider !== void 0 ? provider : defaultCheckBoxAppearanceProvider;
      var appearances = normalizeAppearance(apProvider(this, widget));
      this.updateOnOffWidgetAppearance(widget, onValue, appearances);
    };
    PDFCheckBox2.of = function(acroCheckBox, ref, doc) {
      return new PDFCheckBox2(acroCheckBox, ref, doc);
    };
    return PDFCheckBox2;
  }(PDFField)
);
var PDFDropdown = (
  /** @class */
  function(_super) {
    __extends(PDFDropdown2, _super);
    function PDFDropdown2(acroComboBox, ref, doc) {
      var _this = _super.call(this, acroComboBox, ref, doc) || this;
      assertIs(acroComboBox, "acroComboBox", [
        [PDFAcroComboBox, "PDFAcroComboBox"]
      ]);
      _this.acroField = acroComboBox;
      return _this;
    }
    PDFDropdown2.prototype.getOptions = function() {
      var rawOptions = this.acroField.getOptions();
      var options = new Array(rawOptions.length);
      for (var idx = 0, len = options.length; idx < len; idx++) {
        var _a2 = rawOptions[idx], display = _a2.display, value = _a2.value;
        options[idx] = (display !== null && display !== void 0 ? display : value).decodeText();
      }
      return options;
    };
    PDFDropdown2.prototype.getSelected = function() {
      var values2 = this.acroField.getValues();
      var selected = new Array(values2.length);
      for (var idx = 0, len = values2.length; idx < len; idx++) {
        selected[idx] = values2[idx].decodeText();
      }
      return selected;
    };
    PDFDropdown2.prototype.setOptions = function(options) {
      assertIs(options, "options", [Array]);
      var optionObjects = new Array(options.length);
      for (var idx = 0, len = options.length; idx < len; idx++) {
        optionObjects[idx] = { value: PDFHexString.fromText(options[idx]) };
      }
      this.acroField.setOptions(optionObjects);
    };
    PDFDropdown2.prototype.addOptions = function(options) {
      assertIs(options, "options", ["string", Array]);
      var optionsArr = Array.isArray(options) ? options : [options];
      var existingOptions = this.acroField.getOptions();
      var newOptions = new Array(optionsArr.length);
      for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
        newOptions[idx] = { value: PDFHexString.fromText(optionsArr[idx]) };
      }
      this.acroField.setOptions(existingOptions.concat(newOptions));
    };
    PDFDropdown2.prototype.select = function(options, merge) {
      if (merge === void 0) {
        merge = false;
      }
      assertIs(options, "options", ["string", Array]);
      assertIs(merge, "merge", ["boolean"]);
      var optionsArr = Array.isArray(options) ? options : [options];
      var validOptions = this.getOptions();
      var hasCustomOption = optionsArr.find(function(option) {
        return !validOptions.includes(option);
      });
      if (hasCustomOption)
        this.enableEditing();
      this.markAsDirty();
      if (optionsArr.length > 1 || optionsArr.length === 1 && merge) {
        this.enableMultiselect();
      }
      var values2 = new Array(optionsArr.length);
      for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
        values2[idx] = PDFHexString.fromText(optionsArr[idx]);
      }
      if (merge) {
        var existingValues = this.acroField.getValues();
        this.acroField.setValues(existingValues.concat(values2));
      } else {
        this.acroField.setValues(values2);
      }
    };
    PDFDropdown2.prototype.clear = function() {
      this.markAsDirty();
      this.acroField.setValues([]);
    };
    PDFDropdown2.prototype.setFontSize = function(fontSize) {
      assertPositive(fontSize, "fontSize");
      this.acroField.setFontSize(fontSize);
      this.markAsDirty();
    };
    PDFDropdown2.prototype.isEditable = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.Edit);
    };
    PDFDropdown2.prototype.enableEditing = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.Edit, true);
    };
    PDFDropdown2.prototype.disableEditing = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.Edit, false);
    };
    PDFDropdown2.prototype.isSorted = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.Sort);
    };
    PDFDropdown2.prototype.enableSorting = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.Sort, true);
    };
    PDFDropdown2.prototype.disableSorting = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.Sort, false);
    };
    PDFDropdown2.prototype.isMultiselect = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.MultiSelect);
    };
    PDFDropdown2.prototype.enableMultiselect = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, true);
    };
    PDFDropdown2.prototype.disableMultiselect = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, false);
    };
    PDFDropdown2.prototype.isSpellChecked = function() {
      return !this.acroField.hasFlag(AcroChoiceFlags.DoNotSpellCheck);
    };
    PDFDropdown2.prototype.enableSpellChecking = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.DoNotSpellCheck, false);
    };
    PDFDropdown2.prototype.disableSpellChecking = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.DoNotSpellCheck, true);
    };
    PDFDropdown2.prototype.isSelectOnClick = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.CommitOnSelChange);
    };
    PDFDropdown2.prototype.enableSelectOnClick = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, true);
    };
    PDFDropdown2.prototype.disableSelectOnClick = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, false);
    };
    PDFDropdown2.prototype.addToPage = function(page, options) {
      var _a2, _b2, _c, _d, _e, _f, _g;
      assertIs(page, "page", [[PDFPage, "PDFPage"]]);
      assertFieldAppearanceOptions(options);
      if (!options)
        options = {};
      if (!("textColor" in options))
        options.textColor = rgb(0, 0, 0);
      if (!("backgroundColor" in options))
        options.backgroundColor = rgb(1, 1, 1);
      if (!("borderColor" in options))
        options.borderColor = rgb(0, 0, 0);
      if (!("borderWidth" in options))
        options.borderWidth = 1;
      var widget = this.createWidget({
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : 0,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : 0,
        width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
        height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
        textColor: options.textColor,
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
        rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
        hidden: options.hidden,
        page: page.ref
      });
      var widgetRef = this.doc.context.register(widget.dict);
      this.acroField.addWidget(widgetRef);
      var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
      this.updateWidgetAppearance(widget, font);
      page.node.addAnnot(widgetRef);
    };
    PDFDropdown2.prototype.needsAppearancesUpdate = function() {
      var _a2;
      if (this.isDirty())
        return true;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var hasAppearances = ((_a2 = widget.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal) instanceof PDFStream;
        if (!hasAppearances)
          return true;
      }
      return false;
    };
    PDFDropdown2.prototype.defaultUpdateAppearances = function(font) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      this.updateAppearances(font);
    };
    PDFDropdown2.prototype.updateAppearances = function(font, provider) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      assertOrUndefined(provider, "provider", [Function]);
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        this.updateWidgetAppearance(widget, font, provider);
      }
      this.markAsClean();
    };
    PDFDropdown2.prototype.updateWidgetAppearance = function(widget, font, provider) {
      var apProvider = provider !== null && provider !== void 0 ? provider : defaultDropdownAppearanceProvider;
      var appearances = normalizeAppearance(apProvider(this, widget, font));
      this.updateWidgetAppearanceWithFont(widget, font, appearances);
    };
    PDFDropdown2.of = function(acroComboBox, ref, doc) {
      return new PDFDropdown2(acroComboBox, ref, doc);
    };
    return PDFDropdown2;
  }(PDFField)
);
var PDFOptionList = (
  /** @class */
  function(_super) {
    __extends(PDFOptionList2, _super);
    function PDFOptionList2(acroListBox, ref, doc) {
      var _this = _super.call(this, acroListBox, ref, doc) || this;
      assertIs(acroListBox, "acroListBox", [[PDFAcroListBox, "PDFAcroListBox"]]);
      _this.acroField = acroListBox;
      return _this;
    }
    PDFOptionList2.prototype.getOptions = function() {
      var rawOptions = this.acroField.getOptions();
      var options = new Array(rawOptions.length);
      for (var idx = 0, len = options.length; idx < len; idx++) {
        var _a2 = rawOptions[idx], display = _a2.display, value = _a2.value;
        options[idx] = (display !== null && display !== void 0 ? display : value).decodeText();
      }
      return options;
    };
    PDFOptionList2.prototype.getSelected = function() {
      var values2 = this.acroField.getValues();
      var selected = new Array(values2.length);
      for (var idx = 0, len = values2.length; idx < len; idx++) {
        selected[idx] = values2[idx].decodeText();
      }
      return selected;
    };
    PDFOptionList2.prototype.setOptions = function(options) {
      assertIs(options, "options", [Array]);
      this.markAsDirty();
      var optionObjects = new Array(options.length);
      for (var idx = 0, len = options.length; idx < len; idx++) {
        optionObjects[idx] = { value: PDFHexString.fromText(options[idx]) };
      }
      this.acroField.setOptions(optionObjects);
    };
    PDFOptionList2.prototype.addOptions = function(options) {
      assertIs(options, "options", ["string", Array]);
      this.markAsDirty();
      var optionsArr = Array.isArray(options) ? options : [options];
      var existingOptions = this.acroField.getOptions();
      var newOptions = new Array(optionsArr.length);
      for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
        newOptions[idx] = { value: PDFHexString.fromText(optionsArr[idx]) };
      }
      this.acroField.setOptions(existingOptions.concat(newOptions));
    };
    PDFOptionList2.prototype.select = function(options, merge) {
      if (merge === void 0) {
        merge = false;
      }
      assertIs(options, "options", ["string", Array]);
      assertIs(merge, "merge", ["boolean"]);
      var optionsArr = Array.isArray(options) ? options : [options];
      var validOptions = this.getOptions();
      assertIsSubset(optionsArr, "option", validOptions);
      this.markAsDirty();
      if (optionsArr.length > 1 || optionsArr.length === 1 && merge) {
        this.enableMultiselect();
      }
      var values2 = new Array(optionsArr.length);
      for (var idx = 0, len = optionsArr.length; idx < len; idx++) {
        values2[idx] = PDFHexString.fromText(optionsArr[idx]);
      }
      if (merge) {
        var existingValues = this.acroField.getValues();
        this.acroField.setValues(existingValues.concat(values2));
      } else {
        this.acroField.setValues(values2);
      }
    };
    PDFOptionList2.prototype.clear = function() {
      this.markAsDirty();
      this.acroField.setValues([]);
    };
    PDFOptionList2.prototype.setFontSize = function(fontSize) {
      assertPositive(fontSize, "fontSize");
      this.acroField.setFontSize(fontSize);
      this.markAsDirty();
    };
    PDFOptionList2.prototype.isSorted = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.Sort);
    };
    PDFOptionList2.prototype.enableSorting = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.Sort, true);
    };
    PDFOptionList2.prototype.disableSorting = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.Sort, false);
    };
    PDFOptionList2.prototype.isMultiselect = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.MultiSelect);
    };
    PDFOptionList2.prototype.enableMultiselect = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, true);
    };
    PDFOptionList2.prototype.disableMultiselect = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.MultiSelect, false);
    };
    PDFOptionList2.prototype.isSelectOnClick = function() {
      return this.acroField.hasFlag(AcroChoiceFlags.CommitOnSelChange);
    };
    PDFOptionList2.prototype.enableSelectOnClick = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, true);
    };
    PDFOptionList2.prototype.disableSelectOnClick = function() {
      this.acroField.setFlagTo(AcroChoiceFlags.CommitOnSelChange, false);
    };
    PDFOptionList2.prototype.addToPage = function(page, options) {
      var _a2, _b2, _c, _d, _e, _f, _g;
      assertIs(page, "page", [[PDFPage, "PDFPage"]]);
      assertFieldAppearanceOptions(options);
      if (!options)
        options = {};
      if (!("textColor" in options))
        options.textColor = rgb(0, 0, 0);
      if (!("backgroundColor" in options))
        options.backgroundColor = rgb(1, 1, 1);
      if (!("borderColor" in options))
        options.borderColor = rgb(0, 0, 0);
      if (!("borderWidth" in options))
        options.borderWidth = 1;
      var widget = this.createWidget({
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : 0,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : 0,
        width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
        height: (_d = options.height) !== null && _d !== void 0 ? _d : 100,
        textColor: options.textColor,
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
        rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
        hidden: options.hidden,
        page: page.ref
      });
      var widgetRef = this.doc.context.register(widget.dict);
      this.acroField.addWidget(widgetRef);
      var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
      this.updateWidgetAppearance(widget, font);
      page.node.addAnnot(widgetRef);
    };
    PDFOptionList2.prototype.needsAppearancesUpdate = function() {
      var _a2;
      if (this.isDirty())
        return true;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var hasAppearances = ((_a2 = widget.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal) instanceof PDFStream;
        if (!hasAppearances)
          return true;
      }
      return false;
    };
    PDFOptionList2.prototype.defaultUpdateAppearances = function(font) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      this.updateAppearances(font);
    };
    PDFOptionList2.prototype.updateAppearances = function(font, provider) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      assertOrUndefined(provider, "provider", [Function]);
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        this.updateWidgetAppearance(widget, font, provider);
      }
      this.markAsClean();
    };
    PDFOptionList2.prototype.updateWidgetAppearance = function(widget, font, provider) {
      var apProvider = provider !== null && provider !== void 0 ? provider : defaultOptionListAppearanceProvider;
      var appearances = normalizeAppearance(apProvider(this, widget, font));
      this.updateWidgetAppearanceWithFont(widget, font, appearances);
    };
    PDFOptionList2.of = function(acroListBox, ref, doc) {
      return new PDFOptionList2(acroListBox, ref, doc);
    };
    return PDFOptionList2;
  }(PDFField)
);
var PDFRadioGroup = (
  /** @class */
  function(_super) {
    __extends(PDFRadioGroup2, _super);
    function PDFRadioGroup2(acroRadioButton, ref, doc) {
      var _this = _super.call(this, acroRadioButton, ref, doc) || this;
      assertIs(acroRadioButton, "acroRadioButton", [
        [PDFAcroRadioButton, "PDFAcroRadioButton"]
      ]);
      _this.acroField = acroRadioButton;
      return _this;
    }
    PDFRadioGroup2.prototype.getOptions = function() {
      var exportValues = this.acroField.getExportValues();
      if (exportValues) {
        var exportOptions = new Array(exportValues.length);
        for (var idx = 0, len = exportValues.length; idx < len; idx++) {
          exportOptions[idx] = exportValues[idx].decodeText();
        }
        return exportOptions;
      }
      var onValues = this.acroField.getOnValues();
      var onOptions = new Array(onValues.length);
      for (var idx = 0, len = onOptions.length; idx < len; idx++) {
        onOptions[idx] = onValues[idx].decodeText();
      }
      return onOptions;
    };
    PDFRadioGroup2.prototype.getSelected = function() {
      var value = this.acroField.getValue();
      if (value === PDFName.of("Off"))
        return void 0;
      var exportValues = this.acroField.getExportValues();
      if (exportValues) {
        var onValues = this.acroField.getOnValues();
        for (var idx = 0, len = onValues.length; idx < len; idx++) {
          if (onValues[idx] === value)
            return exportValues[idx].decodeText();
        }
      }
      return value.decodeText();
    };
    PDFRadioGroup2.prototype.select = function(option) {
      assertIs(option, "option", ["string"]);
      var validOptions = this.getOptions();
      assertIsOneOf(option, "option", validOptions);
      this.markAsDirty();
      var onValues = this.acroField.getOnValues();
      var exportValues = this.acroField.getExportValues();
      if (exportValues) {
        for (var idx = 0, len = exportValues.length; idx < len; idx++) {
          if (exportValues[idx].decodeText() === option) {
            this.acroField.setValue(onValues[idx]);
          }
        }
      } else {
        for (var idx = 0, len = onValues.length; idx < len; idx++) {
          var value = onValues[idx];
          if (value.decodeText() === option)
            this.acroField.setValue(value);
        }
      }
    };
    PDFRadioGroup2.prototype.clear = function() {
      this.markAsDirty();
      this.acroField.setValue(PDFName.of("Off"));
    };
    PDFRadioGroup2.prototype.isOffToggleable = function() {
      return !this.acroField.hasFlag(AcroButtonFlags.NoToggleToOff);
    };
    PDFRadioGroup2.prototype.enableOffToggling = function() {
      this.acroField.setFlagTo(AcroButtonFlags.NoToggleToOff, false);
    };
    PDFRadioGroup2.prototype.disableOffToggling = function() {
      this.acroField.setFlagTo(AcroButtonFlags.NoToggleToOff, true);
    };
    PDFRadioGroup2.prototype.isMutuallyExclusive = function() {
      return !this.acroField.hasFlag(AcroButtonFlags.RadiosInUnison);
    };
    PDFRadioGroup2.prototype.enableMutualExclusion = function() {
      this.acroField.setFlagTo(AcroButtonFlags.RadiosInUnison, false);
    };
    PDFRadioGroup2.prototype.disableMutualExclusion = function() {
      this.acroField.setFlagTo(AcroButtonFlags.RadiosInUnison, true);
    };
    PDFRadioGroup2.prototype.addOptionToPage = function(option, page, options) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _j;
      assertIs(option, "option", ["string"]);
      assertIs(page, "page", [[PDFPage, "PDFPage"]]);
      assertFieldAppearanceOptions(options);
      var widget = this.createWidget({
        x: (_a2 = options === null || options === void 0 ? void 0 : options.x) !== null && _a2 !== void 0 ? _a2 : 0,
        y: (_b2 = options === null || options === void 0 ? void 0 : options.y) !== null && _b2 !== void 0 ? _b2 : 0,
        width: (_c = options === null || options === void 0 ? void 0 : options.width) !== null && _c !== void 0 ? _c : 50,
        height: (_d = options === null || options === void 0 ? void 0 : options.height) !== null && _d !== void 0 ? _d : 50,
        textColor: (_e = options === null || options === void 0 ? void 0 : options.textColor) !== null && _e !== void 0 ? _e : rgb(0, 0, 0),
        backgroundColor: (_f = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _f !== void 0 ? _f : rgb(1, 1, 1),
        borderColor: (_g = options === null || options === void 0 ? void 0 : options.borderColor) !== null && _g !== void 0 ? _g : rgb(0, 0, 0),
        borderWidth: (_h = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _h !== void 0 ? _h : 1,
        rotate: (_j = options === null || options === void 0 ? void 0 : options.rotate) !== null && _j !== void 0 ? _j : degrees(0),
        hidden: options === null || options === void 0 ? void 0 : options.hidden,
        page: page.ref
      });
      var widgetRef = this.doc.context.register(widget.dict);
      var apStateValue = this.acroField.addWidgetWithOpt(widgetRef, PDFHexString.fromText(option), !this.isMutuallyExclusive());
      widget.setAppearanceState(PDFName.of("Off"));
      this.updateWidgetAppearance(widget, apStateValue);
      page.node.addAnnot(widgetRef);
    };
    PDFRadioGroup2.prototype.needsAppearancesUpdate = function() {
      var _a2;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var state = widget.getAppearanceState();
        var normal = (_a2 = widget.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal;
        if (!(normal instanceof PDFDict))
          return true;
        if (state && !normal.has(state))
          return true;
      }
      return false;
    };
    PDFRadioGroup2.prototype.defaultUpdateAppearances = function() {
      this.updateAppearances();
    };
    PDFRadioGroup2.prototype.updateAppearances = function(provider) {
      assertOrUndefined(provider, "provider", [Function]);
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var onValue = widget.getOnValue();
        if (!onValue)
          continue;
        this.updateWidgetAppearance(widget, onValue, provider);
      }
    };
    PDFRadioGroup2.prototype.updateWidgetAppearance = function(widget, onValue, provider) {
      var apProvider = provider !== null && provider !== void 0 ? provider : defaultRadioGroupAppearanceProvider;
      var appearances = normalizeAppearance(apProvider(this, widget));
      this.updateOnOffWidgetAppearance(widget, onValue, appearances);
    };
    PDFRadioGroup2.of = function(acroRadioButton, ref, doc) {
      return new PDFRadioGroup2(acroRadioButton, ref, doc);
    };
    return PDFRadioGroup2;
  }(PDFField)
);
var PDFSignature = (
  /** @class */
  function(_super) {
    __extends(PDFSignature2, _super);
    function PDFSignature2(acroSignature, ref, doc) {
      var _this = _super.call(this, acroSignature, ref, doc) || this;
      assertIs(acroSignature, "acroSignature", [
        [PDFAcroSignature, "PDFAcroSignature"]
      ]);
      _this.acroField = acroSignature;
      return _this;
    }
    PDFSignature2.prototype.needsAppearancesUpdate = function() {
      return false;
    };
    PDFSignature2.of = function(acroSignature, ref, doc) {
      return new PDFSignature2(acroSignature, ref, doc);
    };
    return PDFSignature2;
  }(PDFField)
);
var PDFTextField = (
  /** @class */
  function(_super) {
    __extends(PDFTextField2, _super);
    function PDFTextField2(acroText, ref, doc) {
      var _this = _super.call(this, acroText, ref, doc) || this;
      assertIs(acroText, "acroText", [[PDFAcroText, "PDFAcroText"]]);
      _this.acroField = acroText;
      return _this;
    }
    PDFTextField2.prototype.getText = function() {
      var value = this.acroField.getValue();
      if (!value && this.isRichFormatted()) {
        throw new RichTextFieldReadError(this.getName());
      }
      return value === null || value === void 0 ? void 0 : value.decodeText();
    };
    PDFTextField2.prototype.setText = function(text) {
      assertOrUndefined(text, "text", ["string"]);
      var maxLength = this.getMaxLength();
      if (maxLength !== void 0 && text && text.length > maxLength) {
        throw new ExceededMaxLengthError(text.length, maxLength, this.getName());
      }
      this.markAsDirty();
      this.disableRichFormatting();
      if (text) {
        this.acroField.setValue(PDFHexString.fromText(text));
      } else {
        this.acroField.removeValue();
      }
    };
    PDFTextField2.prototype.getAlignment = function() {
      var quadding = this.acroField.getQuadding();
      return quadding === 0 ? TextAlignment.Left : quadding === 1 ? TextAlignment.Center : quadding === 2 ? TextAlignment.Right : TextAlignment.Left;
    };
    PDFTextField2.prototype.setAlignment = function(alignment) {
      assertIsOneOf(alignment, "alignment", TextAlignment);
      this.markAsDirty();
      this.acroField.setQuadding(alignment);
    };
    PDFTextField2.prototype.getMaxLength = function() {
      return this.acroField.getMaxLength();
    };
    PDFTextField2.prototype.setMaxLength = function(maxLength) {
      assertRangeOrUndefined(maxLength, "maxLength", 0, Number.MAX_SAFE_INTEGER);
      this.markAsDirty();
      if (maxLength === void 0) {
        this.acroField.removeMaxLength();
      } else {
        var text = this.getText();
        if (text && text.length > maxLength) {
          throw new InvalidMaxLengthError(text.length, maxLength, this.getName());
        }
        this.acroField.setMaxLength(maxLength);
      }
    };
    PDFTextField2.prototype.removeMaxLength = function() {
      this.markAsDirty();
      this.acroField.removeMaxLength();
    };
    PDFTextField2.prototype.setImage = function(image) {
      var fieldAlignment = this.getAlignment();
      var alignment = fieldAlignment === TextAlignment.Center ? ImageAlignment.Center : fieldAlignment === TextAlignment.Right ? ImageAlignment.Right : ImageAlignment.Left;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var streamRef = this.createImageAppearanceStream(widget, image, alignment);
        this.updateWidgetAppearances(widget, { normal: streamRef });
      }
      this.markAsClean();
    };
    PDFTextField2.prototype.setFontSize = function(fontSize) {
      assertPositive(fontSize, "fontSize");
      this.acroField.setFontSize(fontSize);
      this.markAsDirty();
    };
    PDFTextField2.prototype.isMultiline = function() {
      return this.acroField.hasFlag(AcroTextFlags.Multiline);
    };
    PDFTextField2.prototype.enableMultiline = function() {
      this.markAsDirty();
      this.acroField.setFlagTo(AcroTextFlags.Multiline, true);
    };
    PDFTextField2.prototype.disableMultiline = function() {
      this.markAsDirty();
      this.acroField.setFlagTo(AcroTextFlags.Multiline, false);
    };
    PDFTextField2.prototype.isPassword = function() {
      return this.acroField.hasFlag(AcroTextFlags.Password);
    };
    PDFTextField2.prototype.enablePassword = function() {
      this.acroField.setFlagTo(AcroTextFlags.Password, true);
    };
    PDFTextField2.prototype.disablePassword = function() {
      this.acroField.setFlagTo(AcroTextFlags.Password, false);
    };
    PDFTextField2.prototype.isFileSelector = function() {
      return this.acroField.hasFlag(AcroTextFlags.FileSelect);
    };
    PDFTextField2.prototype.enableFileSelection = function() {
      this.acroField.setFlagTo(AcroTextFlags.FileSelect, true);
    };
    PDFTextField2.prototype.disableFileSelection = function() {
      this.acroField.setFlagTo(AcroTextFlags.FileSelect, false);
    };
    PDFTextField2.prototype.isSpellChecked = function() {
      return !this.acroField.hasFlag(AcroTextFlags.DoNotSpellCheck);
    };
    PDFTextField2.prototype.enableSpellChecking = function() {
      this.acroField.setFlagTo(AcroTextFlags.DoNotSpellCheck, false);
    };
    PDFTextField2.prototype.disableSpellChecking = function() {
      this.acroField.setFlagTo(AcroTextFlags.DoNotSpellCheck, true);
    };
    PDFTextField2.prototype.isScrollable = function() {
      return !this.acroField.hasFlag(AcroTextFlags.DoNotScroll);
    };
    PDFTextField2.prototype.enableScrolling = function() {
      this.acroField.setFlagTo(AcroTextFlags.DoNotScroll, false);
    };
    PDFTextField2.prototype.disableScrolling = function() {
      this.acroField.setFlagTo(AcroTextFlags.DoNotScroll, true);
    };
    PDFTextField2.prototype.isCombed = function() {
      return this.acroField.hasFlag(AcroTextFlags.Comb) && !this.isMultiline() && !this.isPassword() && !this.isFileSelector() && this.getMaxLength() !== void 0;
    };
    PDFTextField2.prototype.enableCombing = function() {
      if (this.getMaxLength() === void 0) {
        var msg = "PDFTextFields must have a max length in order to be combed";
        console.warn(msg);
      }
      this.markAsDirty();
      this.disableMultiline();
      this.disablePassword();
      this.disableFileSelection();
      this.acroField.setFlagTo(AcroTextFlags.Comb, true);
    };
    PDFTextField2.prototype.disableCombing = function() {
      this.markAsDirty();
      this.acroField.setFlagTo(AcroTextFlags.Comb, false);
    };
    PDFTextField2.prototype.isRichFormatted = function() {
      return this.acroField.hasFlag(AcroTextFlags.RichText);
    };
    PDFTextField2.prototype.enableRichFormatting = function() {
      this.acroField.setFlagTo(AcroTextFlags.RichText, true);
    };
    PDFTextField2.prototype.disableRichFormatting = function() {
      this.acroField.setFlagTo(AcroTextFlags.RichText, false);
    };
    PDFTextField2.prototype.addToPage = function(page, options) {
      var _a2, _b2, _c, _d, _e, _f, _g;
      assertIs(page, "page", [[PDFPage, "PDFPage"]]);
      assertFieldAppearanceOptions(options);
      if (!options)
        options = {};
      if (!("textColor" in options))
        options.textColor = rgb(0, 0, 0);
      if (!("backgroundColor" in options))
        options.backgroundColor = rgb(1, 1, 1);
      if (!("borderColor" in options))
        options.borderColor = rgb(0, 0, 0);
      if (!("borderWidth" in options))
        options.borderWidth = 1;
      var widget = this.createWidget({
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : 0,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : 0,
        width: (_c = options.width) !== null && _c !== void 0 ? _c : 200,
        height: (_d = options.height) !== null && _d !== void 0 ? _d : 50,
        textColor: options.textColor,
        backgroundColor: options.backgroundColor,
        borderColor: options.borderColor,
        borderWidth: (_e = options.borderWidth) !== null && _e !== void 0 ? _e : 0,
        rotate: (_f = options.rotate) !== null && _f !== void 0 ? _f : degrees(0),
        hidden: options.hidden,
        page: page.ref
      });
      var widgetRef = this.doc.context.register(widget.dict);
      this.acroField.addWidget(widgetRef);
      var font = (_g = options.font) !== null && _g !== void 0 ? _g : this.doc.getForm().getDefaultFont();
      this.updateWidgetAppearance(widget, font);
      page.node.addAnnot(widgetRef);
    };
    PDFTextField2.prototype.needsAppearancesUpdate = function() {
      var _a2;
      if (this.isDirty())
        return true;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var hasAppearances = ((_a2 = widget.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal) instanceof PDFStream;
        if (!hasAppearances)
          return true;
      }
      return false;
    };
    PDFTextField2.prototype.defaultUpdateAppearances = function(font) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      this.updateAppearances(font);
    };
    PDFTextField2.prototype.updateAppearances = function(font, provider) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      assertOrUndefined(provider, "provider", [Function]);
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        this.updateWidgetAppearance(widget, font, provider);
      }
      this.markAsClean();
    };
    PDFTextField2.prototype.updateWidgetAppearance = function(widget, font, provider) {
      var apProvider = provider !== null && provider !== void 0 ? provider : defaultTextFieldAppearanceProvider;
      var appearances = normalizeAppearance(apProvider(this, widget, font));
      this.updateWidgetAppearanceWithFont(widget, font, appearances);
    };
    PDFTextField2.of = function(acroText, ref, doc) {
      return new PDFTextField2(acroText, ref, doc);
    };
    return PDFTextField2;
  }(PDFField)
);
var StandardFonts;
(function(StandardFonts2) {
  StandardFonts2["Courier"] = "Courier";
  StandardFonts2["CourierBold"] = "Courier-Bold";
  StandardFonts2["CourierOblique"] = "Courier-Oblique";
  StandardFonts2["CourierBoldOblique"] = "Courier-BoldOblique";
  StandardFonts2["Helvetica"] = "Helvetica";
  StandardFonts2["HelveticaBold"] = "Helvetica-Bold";
  StandardFonts2["HelveticaOblique"] = "Helvetica-Oblique";
  StandardFonts2["HelveticaBoldOblique"] = "Helvetica-BoldOblique";
  StandardFonts2["TimesRoman"] = "Times-Roman";
  StandardFonts2["TimesRomanBold"] = "Times-Bold";
  StandardFonts2["TimesRomanItalic"] = "Times-Italic";
  StandardFonts2["TimesRomanBoldItalic"] = "Times-BoldItalic";
  StandardFonts2["Symbol"] = "Symbol";
  StandardFonts2["ZapfDingbats"] = "ZapfDingbats";
})(StandardFonts || (StandardFonts = {}));
var PDFForm = (
  /** @class */
  function() {
    function PDFForm2(acroForm, doc) {
      var _this = this;
      this.embedDefaultFont = function() {
        return _this.doc.embedStandardFont(StandardFonts.Helvetica);
      };
      assertIs(acroForm, "acroForm", [[PDFAcroForm, "PDFAcroForm"]]);
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      this.acroForm = acroForm;
      this.doc = doc;
      this.dirtyFields = /* @__PURE__ */ new Set();
      this.defaultFontCache = Cache.populatedBy(this.embedDefaultFont);
    }
    PDFForm2.prototype.hasXFA = function() {
      return this.acroForm.dict.has(PDFName.of("XFA"));
    };
    PDFForm2.prototype.deleteXFA = function() {
      this.acroForm.dict.delete(PDFName.of("XFA"));
    };
    PDFForm2.prototype.getFields = function() {
      var allFields = this.acroForm.getAllFields();
      var fields = [];
      for (var idx = 0, len = allFields.length; idx < len; idx++) {
        var _a2 = allFields[idx], acroField = _a2[0], ref = _a2[1];
        var field = convertToPDFField(acroField, ref, this.doc);
        if (field)
          fields.push(field);
      }
      return fields;
    };
    PDFForm2.prototype.getFieldMaybe = function(name) {
      assertIs(name, "name", ["string"]);
      var fields = this.getFields();
      for (var idx = 0, len = fields.length; idx < len; idx++) {
        var field = fields[idx];
        if (field.getName() === name)
          return field;
      }
      return void 0;
    };
    PDFForm2.prototype.getField = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getFieldMaybe(name);
      if (field)
        return field;
      throw new NoSuchFieldError(name);
    };
    PDFForm2.prototype.getButton = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFButton)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFButton, field);
    };
    PDFForm2.prototype.getCheckBox = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFCheckBox)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFCheckBox, field);
    };
    PDFForm2.prototype.getDropdown = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFDropdown)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFDropdown, field);
    };
    PDFForm2.prototype.getOptionList = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFOptionList)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFOptionList, field);
    };
    PDFForm2.prototype.getRadioGroup = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFRadioGroup)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFRadioGroup, field);
    };
    PDFForm2.prototype.getSignature = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFSignature)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFSignature, field);
    };
    PDFForm2.prototype.getTextField = function(name) {
      assertIs(name, "name", ["string"]);
      var field = this.getField(name);
      if (field instanceof PDFTextField)
        return field;
      throw new UnexpectedFieldTypeError(name, PDFTextField, field);
    };
    PDFForm2.prototype.createButton = function(name) {
      assertIs(name, "name", ["string"]);
      var nameParts = splitFieldName(name);
      var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
      var button = PDFAcroPushButton.create(this.doc.context);
      button.setPartialName(nameParts.terminal);
      addFieldToParent(parent, [button, button.ref], nameParts.terminal);
      return PDFButton.of(button, button.ref, this.doc);
    };
    PDFForm2.prototype.createCheckBox = function(name) {
      assertIs(name, "name", ["string"]);
      var nameParts = splitFieldName(name);
      var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
      var checkBox = PDFAcroCheckBox.create(this.doc.context);
      checkBox.setPartialName(nameParts.terminal);
      addFieldToParent(parent, [checkBox, checkBox.ref], nameParts.terminal);
      return PDFCheckBox.of(checkBox, checkBox.ref, this.doc);
    };
    PDFForm2.prototype.createDropdown = function(name) {
      assertIs(name, "name", ["string"]);
      var nameParts = splitFieldName(name);
      var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
      var comboBox = PDFAcroComboBox.create(this.doc.context);
      comboBox.setPartialName(nameParts.terminal);
      addFieldToParent(parent, [comboBox, comboBox.ref], nameParts.terminal);
      return PDFDropdown.of(comboBox, comboBox.ref, this.doc);
    };
    PDFForm2.prototype.createOptionList = function(name) {
      assertIs(name, "name", ["string"]);
      var nameParts = splitFieldName(name);
      var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
      var listBox = PDFAcroListBox.create(this.doc.context);
      listBox.setPartialName(nameParts.terminal);
      addFieldToParent(parent, [listBox, listBox.ref], nameParts.terminal);
      return PDFOptionList.of(listBox, listBox.ref, this.doc);
    };
    PDFForm2.prototype.createRadioGroup = function(name) {
      assertIs(name, "name", ["string"]);
      var nameParts = splitFieldName(name);
      var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
      var radioButton = PDFAcroRadioButton.create(this.doc.context);
      radioButton.setPartialName(nameParts.terminal);
      addFieldToParent(parent, [radioButton, radioButton.ref], nameParts.terminal);
      return PDFRadioGroup.of(radioButton, radioButton.ref, this.doc);
    };
    PDFForm2.prototype.createTextField = function(name) {
      assertIs(name, "name", ["string"]);
      var nameParts = splitFieldName(name);
      var parent = this.findOrCreateNonTerminals(nameParts.nonTerminal);
      var text = PDFAcroText.create(this.doc.context);
      text.setPartialName(nameParts.terminal);
      addFieldToParent(parent, [text, text.ref], nameParts.terminal);
      return PDFTextField.of(text, text.ref, this.doc);
    };
    PDFForm2.prototype.flatten = function(options) {
      if (options === void 0) {
        options = { updateFieldAppearances: true };
      }
      if (options.updateFieldAppearances) {
        this.updateFieldAppearances();
      }
      var fields = this.getFields();
      for (var i = 0, lenFields = fields.length; i < lenFields; i++) {
        var field = fields[i];
        var widgets = field.acroField.getWidgets();
        for (var j = 0, lenWidgets = widgets.length; j < lenWidgets; j++) {
          var widget = widgets[j];
          var page = this.findWidgetPage(widget);
          var widgetRef = this.findWidgetAppearanceRef(field, widget);
          var xObjectKey = page.node.newXObject("FlatWidget", widgetRef);
          var rectangle = widget.getRectangle();
          var operators = __spreadArrays([
            pushGraphicsState(),
            translate(rectangle.x, rectangle.y)
          ], rotateInPlace(__assign(__assign({}, rectangle), { rotation: 0 })), [
            drawObject(xObjectKey),
            popGraphicsState()
          ]).filter(Boolean);
          page.pushOperators.apply(page, operators);
        }
        this.removeField(field);
      }
    };
    PDFForm2.prototype.removeField = function(field) {
      var widgets = field.acroField.getWidgets();
      var pages = /* @__PURE__ */ new Set();
      for (var i = 0, len = widgets.length; i < len; i++) {
        var widget = widgets[i];
        var widgetRef = this.findWidgetAppearanceRef(field, widget);
        var page = this.findWidgetPage(widget);
        pages.add(page);
        page.node.removeAnnot(widgetRef);
      }
      pages.forEach(function(page2) {
        return page2.node.removeAnnot(field.ref);
      });
      this.acroForm.removeField(field.acroField);
      var fieldKids = field.acroField.normalizedEntries().Kids;
      var kidsCount = fieldKids.size();
      for (var childIndex = 0; childIndex < kidsCount; childIndex++) {
        var child = fieldKids.get(childIndex);
        if (child instanceof PDFRef) {
          this.doc.context.delete(child);
        }
      }
      this.doc.context.delete(field.ref);
    };
    PDFForm2.prototype.updateFieldAppearances = function(font) {
      assertOrUndefined(font, "font", [[PDFFont, "PDFFont"]]);
      font = font !== null && font !== void 0 ? font : this.getDefaultFont();
      var fields = this.getFields();
      for (var idx = 0, len = fields.length; idx < len; idx++) {
        var field = fields[idx];
        if (field.needsAppearancesUpdate()) {
          field.defaultUpdateAppearances(font);
        }
      }
    };
    PDFForm2.prototype.markFieldAsDirty = function(fieldRef) {
      assertOrUndefined(fieldRef, "fieldRef", [[PDFRef, "PDFRef"]]);
      this.dirtyFields.add(fieldRef);
    };
    PDFForm2.prototype.markFieldAsClean = function(fieldRef) {
      assertOrUndefined(fieldRef, "fieldRef", [[PDFRef, "PDFRef"]]);
      this.dirtyFields.delete(fieldRef);
    };
    PDFForm2.prototype.fieldIsDirty = function(fieldRef) {
      assertOrUndefined(fieldRef, "fieldRef", [[PDFRef, "PDFRef"]]);
      return this.dirtyFields.has(fieldRef);
    };
    PDFForm2.prototype.getDefaultFont = function() {
      return this.defaultFontCache.access();
    };
    PDFForm2.prototype.findWidgetPage = function(widget) {
      var pageRef = widget.P();
      var page = this.doc.getPages().find(function(x) {
        return x.ref === pageRef;
      });
      if (page === void 0) {
        var widgetRef = this.doc.context.getObjectRef(widget.dict);
        if (widgetRef === void 0) {
          throw new Error("Could not find PDFRef for PDFObject");
        }
        page = this.doc.findPageForAnnotationRef(widgetRef);
        if (page === void 0) {
          throw new Error("Could not find page for PDFRef " + widgetRef);
        }
      }
      return page;
    };
    PDFForm2.prototype.findWidgetAppearanceRef = function(field, widget) {
      var _a2;
      var refOrDict = widget.getNormalAppearance();
      if (refOrDict instanceof PDFDict && (field instanceof PDFCheckBox || field instanceof PDFRadioGroup)) {
        var value = field.acroField.getValue();
        var ref = (_a2 = refOrDict.get(value)) !== null && _a2 !== void 0 ? _a2 : refOrDict.get(PDFName.of("Off"));
        if (ref instanceof PDFRef) {
          refOrDict = ref;
        }
      }
      if (!(refOrDict instanceof PDFRef)) {
        var name_1 = field.getName();
        throw new Error("Failed to extract appearance ref for: " + name_1);
      }
      return refOrDict;
    };
    PDFForm2.prototype.findOrCreateNonTerminals = function(partialNames) {
      var nonTerminal = [
        this.acroForm
      ];
      for (var idx = 0, len = partialNames.length; idx < len; idx++) {
        var namePart = partialNames[idx];
        if (!namePart)
          throw new InvalidFieldNamePartError(namePart);
        var parent_1 = nonTerminal[0], parentRef = nonTerminal[1];
        var res = this.findNonTerminal(namePart, parent_1);
        if (res) {
          nonTerminal = res;
        } else {
          var node = PDFAcroNonTerminal.create(this.doc.context);
          node.setPartialName(namePart);
          node.setParent(parentRef);
          var nodeRef = this.doc.context.register(node.dict);
          parent_1.addField(nodeRef);
          nonTerminal = [node, nodeRef];
        }
      }
      return nonTerminal;
    };
    PDFForm2.prototype.findNonTerminal = function(partialName, parent) {
      var fields = parent instanceof PDFAcroForm ? this.acroForm.getFields() : createPDFAcroFields(parent.Kids());
      for (var idx = 0, len = fields.length; idx < len; idx++) {
        var _a2 = fields[idx], field = _a2[0], ref = _a2[1];
        if (field.getPartialName() === partialName) {
          if (field instanceof PDFAcroNonTerminal)
            return [field, ref];
          throw new FieldAlreadyExistsError(partialName);
        }
      }
      return void 0;
    };
    PDFForm2.of = function(acroForm, doc) {
      return new PDFForm2(acroForm, doc);
    };
    return PDFForm2;
  }()
);
var convertToPDFField = function(field, ref, doc) {
  if (field instanceof PDFAcroPushButton)
    return PDFButton.of(field, ref, doc);
  if (field instanceof PDFAcroCheckBox)
    return PDFCheckBox.of(field, ref, doc);
  if (field instanceof PDFAcroComboBox)
    return PDFDropdown.of(field, ref, doc);
  if (field instanceof PDFAcroListBox)
    return PDFOptionList.of(field, ref, doc);
  if (field instanceof PDFAcroText)
    return PDFTextField.of(field, ref, doc);
  if (field instanceof PDFAcroRadioButton) {
    return PDFRadioGroup.of(field, ref, doc);
  }
  if (field instanceof PDFAcroSignature) {
    return PDFSignature.of(field, ref, doc);
  }
  return void 0;
};
var splitFieldName = function(fullyQualifiedName) {
  if (fullyQualifiedName.length === 0) {
    throw new Error("PDF field names must not be empty strings");
  }
  var parts = fullyQualifiedName.split(".");
  for (var idx = 0, len = parts.length; idx < len; idx++) {
    if (parts[idx] === "") {
      throw new Error('Periods in PDF field names must be separated by at least one character: "' + fullyQualifiedName + '"');
    }
  }
  if (parts.length === 1)
    return { nonTerminal: [], terminal: parts[0] };
  return {
    nonTerminal: parts.slice(0, parts.length - 1),
    terminal: parts[parts.length - 1]
  };
};
var addFieldToParent = function(_a2, _b2, partialName) {
  var parent = _a2[0], parentRef = _a2[1];
  var field = _b2[0], fieldRef = _b2[1];
  var entries = parent.normalizedEntries();
  var fields = createPDFAcroFields("Kids" in entries ? entries.Kids : entries.Fields);
  for (var idx = 0, len = fields.length; idx < len; idx++) {
    if (fields[idx][0].getPartialName() === partialName) {
      throw new FieldAlreadyExistsError(partialName);
    }
  }
  parent.addField(fieldRef);
  field.setParent(parentRef);
};
var PageSizes = {
  A4: [595.28, 841.89]
};
var ParseSpeeds;
(function(ParseSpeeds2) {
  ParseSpeeds2[ParseSpeeds2["Fastest"] = Infinity] = "Fastest";
  ParseSpeeds2[ParseSpeeds2["Fast"] = 1500] = "Fast";
  ParseSpeeds2[ParseSpeeds2["Medium"] = 500] = "Medium";
  ParseSpeeds2[ParseSpeeds2["Slow"] = 100] = "Slow";
})(ParseSpeeds || (ParseSpeeds = {}));
var PDFEmbeddedFile = (
  /** @class */
  function() {
    function PDFEmbeddedFile2(ref, doc, embedder) {
      this.alreadyEmbedded = false;
      this.ref = ref;
      this.doc = doc;
      this.embedder = embedder;
    }
    PDFEmbeddedFile2.prototype.embed = function() {
      return __awaiter(this, void 0, void 0, function() {
        var ref, Names, EmbeddedFiles, EFNames, AF;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (!!this.alreadyEmbedded) return [3, 2];
              return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
            case 1:
              ref = _a2.sent();
              if (!this.doc.catalog.has(PDFName.of("Names"))) {
                this.doc.catalog.set(PDFName.of("Names"), this.doc.context.obj({}));
              }
              Names = this.doc.catalog.lookup(PDFName.of("Names"), PDFDict);
              if (!Names.has(PDFName.of("EmbeddedFiles"))) {
                Names.set(PDFName.of("EmbeddedFiles"), this.doc.context.obj({}));
              }
              EmbeddedFiles = Names.lookup(PDFName.of("EmbeddedFiles"), PDFDict);
              if (!EmbeddedFiles.has(PDFName.of("Names"))) {
                EmbeddedFiles.set(PDFName.of("Names"), this.doc.context.obj([]));
              }
              EFNames = EmbeddedFiles.lookup(PDFName.of("Names"), PDFArray);
              EFNames.push(PDFHexString.fromText(this.embedder.fileName));
              EFNames.push(ref);
              if (!this.doc.catalog.has(PDFName.of("AF"))) {
                this.doc.catalog.set(PDFName.of("AF"), this.doc.context.obj([]));
              }
              AF = this.doc.catalog.lookup(PDFName.of("AF"), PDFArray);
              AF.push(ref);
              this.alreadyEmbedded = true;
              _a2.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFEmbeddedFile2.of = function(ref, doc, embedder) {
      return new PDFEmbeddedFile2(ref, doc, embedder);
    };
    return PDFEmbeddedFile2;
  }()
);
var PDFJavaScript = (
  /** @class */
  function() {
    function PDFJavaScript2(ref, doc, embedder) {
      this.alreadyEmbedded = false;
      this.ref = ref;
      this.doc = doc;
      this.embedder = embedder;
    }
    PDFJavaScript2.prototype.embed = function() {
      return __awaiter(this, void 0, void 0, function() {
        var _a2, catalog, context, ref, Names, Javascript, JSNames;
        return __generator(this, function(_b2) {
          switch (_b2.label) {
            case 0:
              if (!!this.alreadyEmbedded) return [3, 2];
              _a2 = this.doc, catalog = _a2.catalog, context = _a2.context;
              return [4, this.embedder.embedIntoContext(this.doc.context, this.ref)];
            case 1:
              ref = _b2.sent();
              if (!catalog.has(PDFName.of("Names"))) {
                catalog.set(PDFName.of("Names"), context.obj({}));
              }
              Names = catalog.lookup(PDFName.of("Names"), PDFDict);
              if (!Names.has(PDFName.of("JavaScript"))) {
                Names.set(PDFName.of("JavaScript"), context.obj({}));
              }
              Javascript = Names.lookup(PDFName.of("JavaScript"), PDFDict);
              if (!Javascript.has(PDFName.of("Names"))) {
                Javascript.set(PDFName.of("Names"), context.obj([]));
              }
              JSNames = Javascript.lookup(PDFName.of("Names"), PDFArray);
              JSNames.push(PDFHexString.fromText(this.embedder.scriptName));
              JSNames.push(ref);
              this.alreadyEmbedded = true;
              _b2.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFJavaScript2.of = function(ref, doc, embedder) {
      return new PDFJavaScript2(ref, doc, embedder);
    };
    return PDFJavaScript2;
  }()
);
var JavaScriptEmbedder = (
  /** @class */
  function() {
    function JavaScriptEmbedder2(script, scriptName) {
      this.script = script;
      this.scriptName = scriptName;
    }
    JavaScriptEmbedder2.for = function(script, scriptName) {
      return new JavaScriptEmbedder2(script, scriptName);
    };
    JavaScriptEmbedder2.prototype.embedIntoContext = function(context, ref) {
      return __awaiter(this, void 0, void 0, function() {
        var jsActionDict;
        return __generator(this, function(_a2) {
          jsActionDict = context.obj({
            Type: "Action",
            S: "JavaScript",
            JS: PDFHexString.fromText(this.script)
          });
          if (ref) {
            context.assign(ref, jsActionDict);
            return [2, ref];
          } else {
            return [2, context.register(jsActionDict)];
          }
        });
      });
    };
    return JavaScriptEmbedder2;
  }()
);
var PDFDocument = (
  /** @class */
  function() {
    function PDFDocument2(context, ignoreEncryption, updateMetadata) {
      var _this = this;
      this.defaultWordBreaks = [" "];
      this.computePages = function() {
        var pages = [];
        _this.catalog.Pages().traverse(function(node, ref) {
          if (node instanceof PDFPageLeaf) {
            var page = _this.pageMap.get(node);
            if (!page) {
              page = PDFPage.of(node, ref, _this);
              _this.pageMap.set(node, page);
            }
            pages.push(page);
          }
        });
        return pages;
      };
      this.getOrCreateForm = function() {
        var acroForm = _this.catalog.getOrCreateAcroForm();
        return PDFForm.of(acroForm, _this);
      };
      assertIs(context, "context", [[PDFContext, "PDFContext"]]);
      assertIs(ignoreEncryption, "ignoreEncryption", ["boolean"]);
      this.context = context;
      this.catalog = context.lookup(context.trailerInfo.Root);
      this.isEncrypted = !!context.lookup(context.trailerInfo.Encrypt);
      this.pageCache = Cache.populatedBy(this.computePages);
      this.pageMap = /* @__PURE__ */ new Map();
      this.formCache = Cache.populatedBy(this.getOrCreateForm);
      this.fonts = [];
      this.images = [];
      this.embeddedPages = [];
      this.embeddedFiles = [];
      this.javaScripts = [];
      if (!ignoreEncryption && this.isEncrypted)
        throw new EncryptedPDFError();
      if (updateMetadata)
        this.updateInfoDict();
    }
    PDFDocument2.load = function(pdf, options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var _a2, ignoreEncryption, _b2, parseSpeed, _c, throwOnInvalidObject, _d, updateMetadata, _e, capNumbers, bytes, context;
        return __generator(this, function(_f) {
          switch (_f.label) {
            case 0:
              _a2 = options.ignoreEncryption, ignoreEncryption = _a2 === void 0 ? false : _a2, _b2 = options.parseSpeed, parseSpeed = _b2 === void 0 ? ParseSpeeds.Slow : _b2, _c = options.throwOnInvalidObject, throwOnInvalidObject = _c === void 0 ? false : _c, _d = options.updateMetadata, updateMetadata = _d === void 0 ? true : _d, _e = options.capNumbers, capNumbers = _e === void 0 ? false : _e;
              assertIs(pdf, "pdf", ["string", Uint8Array, ArrayBuffer]);
              assertIs(ignoreEncryption, "ignoreEncryption", ["boolean"]);
              assertIs(parseSpeed, "parseSpeed", ["number"]);
              assertIs(throwOnInvalidObject, "throwOnInvalidObject", ["boolean"]);
              bytes = toUint8Array(pdf);
              return [4, PDFParser.forBytesWithOptions(bytes, parseSpeed, throwOnInvalidObject, capNumbers).parseDocument()];
            case 1:
              context = _f.sent();
              return [2, new PDFDocument2(context, ignoreEncryption, updateMetadata)];
          }
        });
      });
    };
    PDFDocument2.create = function(options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var _a2, updateMetadata, context, pageTree, pageTreeRef, catalog;
        return __generator(this, function(_b2) {
          _a2 = options.updateMetadata, updateMetadata = _a2 === void 0 ? true : _a2;
          context = PDFContext.create();
          pageTree = PDFPageTree.withContext(context);
          pageTreeRef = context.register(pageTree);
          catalog = PDFCatalog.withContextAndPages(context, pageTreeRef);
          context.trailerInfo.Root = context.register(catalog);
          return [2, new PDFDocument2(context, false, updateMetadata)];
        });
      });
    };
    PDFDocument2.prototype.registerFontkit = function(fontkit) {
      this.fontkit = fontkit;
    };
    PDFDocument2.prototype.getForm = function() {
      var form = this.formCache.access();
      if (form.hasXFA()) {
        console.warn("Removing XFA form data as pdf-lib does not support reading or writing XFA");
        form.deleteXFA();
      }
      return form;
    };
    PDFDocument2.prototype.getTitle = function() {
      var title = this.getInfoDict().lookup(PDFName.Title);
      if (!title)
        return void 0;
      assertIsLiteralOrHexString(title);
      return title.decodeText();
    };
    PDFDocument2.prototype.getAuthor = function() {
      var author = this.getInfoDict().lookup(PDFName.Author);
      if (!author)
        return void 0;
      assertIsLiteralOrHexString(author);
      return author.decodeText();
    };
    PDFDocument2.prototype.getSubject = function() {
      var subject = this.getInfoDict().lookup(PDFName.Subject);
      if (!subject)
        return void 0;
      assertIsLiteralOrHexString(subject);
      return subject.decodeText();
    };
    PDFDocument2.prototype.getKeywords = function() {
      var keywords = this.getInfoDict().lookup(PDFName.Keywords);
      if (!keywords)
        return void 0;
      assertIsLiteralOrHexString(keywords);
      return keywords.decodeText();
    };
    PDFDocument2.prototype.getCreator = function() {
      var creator = this.getInfoDict().lookup(PDFName.Creator);
      if (!creator)
        return void 0;
      assertIsLiteralOrHexString(creator);
      return creator.decodeText();
    };
    PDFDocument2.prototype.getProducer = function() {
      var producer = this.getInfoDict().lookup(PDFName.Producer);
      if (!producer)
        return void 0;
      assertIsLiteralOrHexString(producer);
      return producer.decodeText();
    };
    PDFDocument2.prototype.getCreationDate = function() {
      var creationDate = this.getInfoDict().lookup(PDFName.CreationDate);
      if (!creationDate)
        return void 0;
      assertIsLiteralOrHexString(creationDate);
      return creationDate.decodeDate();
    };
    PDFDocument2.prototype.getModificationDate = function() {
      var modificationDate = this.getInfoDict().lookup(PDFName.ModDate);
      if (!modificationDate)
        return void 0;
      assertIsLiteralOrHexString(modificationDate);
      return modificationDate.decodeDate();
    };
    PDFDocument2.prototype.setTitle = function(title, options) {
      assertIs(title, "title", ["string"]);
      var key = PDFName.of("Title");
      this.getInfoDict().set(key, PDFHexString.fromText(title));
      if (options === null || options === void 0 ? void 0 : options.showInWindowTitleBar) {
        var prefs = this.catalog.getOrCreateViewerPreferences();
        prefs.setDisplayDocTitle(true);
      }
    };
    PDFDocument2.prototype.setAuthor = function(author) {
      assertIs(author, "author", ["string"]);
      var key = PDFName.of("Author");
      this.getInfoDict().set(key, PDFHexString.fromText(author));
    };
    PDFDocument2.prototype.setSubject = function(subject) {
      assertIs(subject, "author", ["string"]);
      var key = PDFName.of("Subject");
      this.getInfoDict().set(key, PDFHexString.fromText(subject));
    };
    PDFDocument2.prototype.setKeywords = function(keywords) {
      assertIs(keywords, "keywords", [Array]);
      var key = PDFName.of("Keywords");
      this.getInfoDict().set(key, PDFHexString.fromText(keywords.join(" ")));
    };
    PDFDocument2.prototype.setCreator = function(creator) {
      assertIs(creator, "creator", ["string"]);
      var key = PDFName.of("Creator");
      this.getInfoDict().set(key, PDFHexString.fromText(creator));
    };
    PDFDocument2.prototype.setProducer = function(producer) {
      assertIs(producer, "creator", ["string"]);
      var key = PDFName.of("Producer");
      this.getInfoDict().set(key, PDFHexString.fromText(producer));
    };
    PDFDocument2.prototype.setLanguage = function(language) {
      assertIs(language, "language", ["string"]);
      var key = PDFName.of("Lang");
      this.catalog.set(key, PDFString.of(language));
    };
    PDFDocument2.prototype.setCreationDate = function(creationDate) {
      assertIs(creationDate, "creationDate", [[Date, "Date"]]);
      var key = PDFName.of("CreationDate");
      this.getInfoDict().set(key, PDFString.fromDate(creationDate));
    };
    PDFDocument2.prototype.setModificationDate = function(modificationDate) {
      assertIs(modificationDate, "modificationDate", [[Date, "Date"]]);
      var key = PDFName.of("ModDate");
      this.getInfoDict().set(key, PDFString.fromDate(modificationDate));
    };
    PDFDocument2.prototype.getPageCount = function() {
      if (this.pageCount === void 0)
        this.pageCount = this.getPages().length;
      return this.pageCount;
    };
    PDFDocument2.prototype.getPages = function() {
      return this.pageCache.access();
    };
    PDFDocument2.prototype.getPage = function(index) {
      var pages = this.getPages();
      assertRange(index, "index", 0, pages.length - 1);
      return pages[index];
    };
    PDFDocument2.prototype.getPageIndices = function() {
      return range(0, this.getPageCount());
    };
    PDFDocument2.prototype.removePage = function(index) {
      var pageCount = this.getPageCount();
      if (this.pageCount === 0)
        throw new RemovePageFromEmptyDocumentError();
      assertRange(index, "index", 0, pageCount - 1);
      this.catalog.removeLeafNode(index);
      this.pageCount = pageCount - 1;
    };
    PDFDocument2.prototype.addPage = function(page) {
      assertIs(page, "page", ["undefined", [PDFPage, "PDFPage"], Array]);
      return this.insertPage(this.getPageCount(), page);
    };
    PDFDocument2.prototype.insertPage = function(index, page) {
      var pageCount = this.getPageCount();
      assertRange(index, "index", 0, pageCount);
      assertIs(page, "page", ["undefined", [PDFPage, "PDFPage"], Array]);
      if (!page || Array.isArray(page)) {
        var dims = Array.isArray(page) ? page : PageSizes.A4;
        page = PDFPage.create(this);
        page.setSize.apply(page, dims);
      } else if (page.doc !== this) {
        throw new ForeignPageError();
      }
      var parentRef = this.catalog.insertLeafNode(page.ref, index);
      page.node.setParent(parentRef);
      this.pageMap.set(page.node, page);
      this.pageCache.invalidate();
      this.pageCount = pageCount + 1;
      return page;
    };
    PDFDocument2.prototype.copyPages = function(srcDoc, indices) {
      return __awaiter(this, void 0, void 0, function() {
        var copier, srcPages, copiedPages, idx, len, srcPage, copiedPage, ref;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              assertIs(srcDoc, "srcDoc", [[PDFDocument2, "PDFDocument"]]);
              assertIs(indices, "indices", [Array]);
              return [4, srcDoc.flush()];
            case 1:
              _a2.sent();
              copier = PDFObjectCopier.for(srcDoc.context, this.context);
              srcPages = srcDoc.getPages();
              copiedPages = new Array(indices.length);
              for (idx = 0, len = indices.length; idx < len; idx++) {
                srcPage = srcPages[indices[idx]];
                copiedPage = copier.copy(srcPage.node);
                ref = this.context.register(copiedPage);
                copiedPages[idx] = PDFPage.of(copiedPage, ref, this);
              }
              return [2, copiedPages];
          }
        });
      });
    };
    PDFDocument2.prototype.copy = function() {
      return __awaiter(this, void 0, void 0, function() {
        var pdfCopy, contentPages, idx, len;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, PDFDocument2.create()];
            case 1:
              pdfCopy = _a2.sent();
              return [4, pdfCopy.copyPages(this, this.getPageIndices())];
            case 2:
              contentPages = _a2.sent();
              for (idx = 0, len = contentPages.length; idx < len; idx++) {
                pdfCopy.addPage(contentPages[idx]);
              }
              if (this.getAuthor() !== void 0) {
                pdfCopy.setAuthor(this.getAuthor());
              }
              if (this.getCreationDate() !== void 0) {
                pdfCopy.setCreationDate(this.getCreationDate());
              }
              if (this.getCreator() !== void 0) {
                pdfCopy.setCreator(this.getCreator());
              }
              if (this.getModificationDate() !== void 0) {
                pdfCopy.setModificationDate(this.getModificationDate());
              }
              if (this.getProducer() !== void 0) {
                pdfCopy.setProducer(this.getProducer());
              }
              if (this.getSubject() !== void 0) {
                pdfCopy.setSubject(this.getSubject());
              }
              if (this.getTitle() !== void 0) {
                pdfCopy.setTitle(this.getTitle());
              }
              pdfCopy.defaultWordBreaks = this.defaultWordBreaks;
              return [2, pdfCopy];
          }
        });
      });
    };
    PDFDocument2.prototype.addJavaScript = function(name, script) {
      assertIs(name, "name", ["string"]);
      assertIs(script, "script", ["string"]);
      var embedder = JavaScriptEmbedder.for(script, name);
      var ref = this.context.nextRef();
      var javaScript = PDFJavaScript.of(ref, this, embedder);
      this.javaScripts.push(javaScript);
    };
    PDFDocument2.prototype.attach = function(attachment, name, options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var bytes, embedder, ref, embeddedFile;
        return __generator(this, function(_a2) {
          assertIs(attachment, "attachment", ["string", Uint8Array, ArrayBuffer]);
          assertIs(name, "name", ["string"]);
          assertOrUndefined(options.mimeType, "mimeType", ["string"]);
          assertOrUndefined(options.description, "description", ["string"]);
          assertOrUndefined(options.creationDate, "options.creationDate", [Date]);
          assertOrUndefined(options.modificationDate, "options.modificationDate", [
            Date
          ]);
          assertIsOneOfOrUndefined(options.afRelationship, "options.afRelationship", AFRelationship);
          bytes = toUint8Array(attachment);
          embedder = FileEmbedder.for(bytes, name, options);
          ref = this.context.nextRef();
          embeddedFile = PDFEmbeddedFile.of(ref, this, embedder);
          this.embeddedFiles.push(embeddedFile);
          return [
            2
            /*return*/
          ];
        });
      });
    };
    PDFDocument2.prototype.embedFont = function(font, options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var _a2, subset, customName, features, embedder, bytes, fontkit, _b2, ref, pdfFont;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              _a2 = options.subset, subset = _a2 === void 0 ? false : _a2, customName = options.customName, features = options.features;
              assertIs(font, "font", ["string", Uint8Array, ArrayBuffer]);
              assertIs(subset, "subset", ["boolean"]);
              if (!isStandardFont(font)) return [3, 1];
              embedder = StandardFontEmbedder.for(font, customName);
              return [3, 7];
            case 1:
              if (!canBeConvertedToUint8Array(font)) return [3, 6];
              bytes = toUint8Array(font);
              fontkit = this.assertFontkit();
              if (!subset) return [3, 3];
              return [4, CustomFontSubsetEmbedder.for(fontkit, bytes, customName, features)];
            case 2:
              _b2 = _c.sent();
              return [3, 5];
            case 3:
              return [4, CustomFontEmbedder.for(fontkit, bytes, customName, features)];
            case 4:
              _b2 = _c.sent();
              _c.label = 5;
            case 5:
              embedder = _b2;
              return [3, 7];
            case 6:
              throw new TypeError("`font` must be one of `StandardFonts | string | Uint8Array | ArrayBuffer`");
            case 7:
              ref = this.context.nextRef();
              pdfFont = PDFFont.of(ref, this, embedder);
              this.fonts.push(pdfFont);
              return [2, pdfFont];
          }
        });
      });
    };
    PDFDocument2.prototype.embedStandardFont = function(font, customName) {
      assertIs(font, "font", ["string"]);
      if (!isStandardFont(font)) {
        throw new TypeError("`font` must be one of type `StandardFonts`");
      }
      var embedder = StandardFontEmbedder.for(font, customName);
      var ref = this.context.nextRef();
      var pdfFont = PDFFont.of(ref, this, embedder);
      this.fonts.push(pdfFont);
      return pdfFont;
    };
    PDFDocument2.prototype.embedJpg = function(jpg) {
      return __awaiter(this, void 0, void 0, function() {
        var bytes, embedder, ref, pdfImage;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              assertIs(jpg, "jpg", ["string", Uint8Array, ArrayBuffer]);
              bytes = toUint8Array(jpg);
              return [4, JpegEmbedder.for(bytes)];
            case 1:
              embedder = _a2.sent();
              ref = this.context.nextRef();
              pdfImage = PDFImage.of(ref, this, embedder);
              this.images.push(pdfImage);
              return [2, pdfImage];
          }
        });
      });
    };
    PDFDocument2.prototype.embedPng = function(png) {
      return __awaiter(this, void 0, void 0, function() {
        var bytes, embedder, ref, pdfImage;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              assertIs(png, "png", ["string", Uint8Array, ArrayBuffer]);
              bytes = toUint8Array(png);
              return [4, PngEmbedder.for(bytes)];
            case 1:
              embedder = _a2.sent();
              ref = this.context.nextRef();
              pdfImage = PDFImage.of(ref, this, embedder);
              this.images.push(pdfImage);
              return [2, pdfImage];
          }
        });
      });
    };
    PDFDocument2.prototype.embedPdf = function(pdf, indices) {
      if (indices === void 0) {
        indices = [0];
      }
      return __awaiter(this, void 0, void 0, function() {
        var srcDoc, _a2, srcPages;
        return __generator(this, function(_b2) {
          switch (_b2.label) {
            case 0:
              assertIs(pdf, "pdf", [
                "string",
                Uint8Array,
                ArrayBuffer,
                [PDFDocument2, "PDFDocument"]
              ]);
              assertIs(indices, "indices", [Array]);
              if (!(pdf instanceof PDFDocument2)) return [3, 1];
              _a2 = pdf;
              return [3, 3];
            case 1:
              return [4, PDFDocument2.load(pdf)];
            case 2:
              _a2 = _b2.sent();
              _b2.label = 3;
            case 3:
              srcDoc = _a2;
              srcPages = pluckIndices(srcDoc.getPages(), indices);
              return [2, this.embedPages(srcPages)];
          }
        });
      });
    };
    PDFDocument2.prototype.embedPage = function(page, boundingBox, transformationMatrix) {
      return __awaiter(this, void 0, void 0, function() {
        var embeddedPage;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              assertIs(page, "page", [[PDFPage, "PDFPage"]]);
              return [4, this.embedPages([page], [boundingBox], [transformationMatrix])];
            case 1:
              embeddedPage = _a2.sent()[0];
              return [2, embeddedPage];
          }
        });
      });
    };
    PDFDocument2.prototype.embedPages = function(pages, boundingBoxes, transformationMatrices) {
      if (boundingBoxes === void 0) {
        boundingBoxes = [];
      }
      if (transformationMatrices === void 0) {
        transformationMatrices = [];
      }
      return __awaiter(this, void 0, void 0, function() {
        var idx, len, currPage, nextPage, context, maybeCopyPage, embeddedPages, idx, len, page, box, matrix, embedder, ref;
        var _a2;
        return __generator(this, function(_b2) {
          switch (_b2.label) {
            case 0:
              if (pages.length === 0)
                return [2, []];
              for (idx = 0, len = pages.length - 1; idx < len; idx++) {
                currPage = pages[idx];
                nextPage = pages[idx + 1];
                if (currPage.node.context !== nextPage.node.context) {
                  throw new PageEmbeddingMismatchedContextError();
                }
              }
              context = pages[0].node.context;
              maybeCopyPage = context === this.context ? function(p) {
                return p;
              } : PDFObjectCopier.for(context, this.context).copy;
              embeddedPages = new Array(pages.length);
              idx = 0, len = pages.length;
              _b2.label = 1;
            case 1:
              if (!(idx < len)) return [3, 4];
              page = maybeCopyPage(pages[idx].node);
              box = boundingBoxes[idx];
              matrix = transformationMatrices[idx];
              return [4, PDFPageEmbedder.for(page, box, matrix)];
            case 2:
              embedder = _b2.sent();
              ref = this.context.nextRef();
              embeddedPages[idx] = PDFEmbeddedPage.of(ref, this, embedder);
              _b2.label = 3;
            case 3:
              idx++;
              return [3, 1];
            case 4:
              (_a2 = this.embeddedPages).push.apply(_a2, embeddedPages);
              return [2, embeddedPages];
          }
        });
      });
    };
    PDFDocument2.prototype.flush = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              return [4, this.embedAll(this.fonts)];
            case 1:
              _a2.sent();
              return [4, this.embedAll(this.images)];
            case 2:
              _a2.sent();
              return [4, this.embedAll(this.embeddedPages)];
            case 3:
              _a2.sent();
              return [4, this.embedAll(this.embeddedFiles)];
            case 4:
              _a2.sent();
              return [4, this.embedAll(this.javaScripts)];
            case 5:
              _a2.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFDocument2.prototype.save = function(options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var _a2, useObjectStreams, _b2, addDefaultPage, _c, objectsPerTick, _d, updateFieldAppearances, form, Writer;
        return __generator(this, function(_e) {
          switch (_e.label) {
            case 0:
              _a2 = options.useObjectStreams, useObjectStreams = _a2 === void 0 ? true : _a2, _b2 = options.addDefaultPage, addDefaultPage = _b2 === void 0 ? true : _b2, _c = options.objectsPerTick, objectsPerTick = _c === void 0 ? 50 : _c, _d = options.updateFieldAppearances, updateFieldAppearances = _d === void 0 ? true : _d;
              assertIs(useObjectStreams, "useObjectStreams", ["boolean"]);
              assertIs(addDefaultPage, "addDefaultPage", ["boolean"]);
              assertIs(objectsPerTick, "objectsPerTick", ["number"]);
              assertIs(updateFieldAppearances, "updateFieldAppearances", ["boolean"]);
              if (addDefaultPage && this.getPageCount() === 0)
                this.addPage();
              if (updateFieldAppearances) {
                form = this.formCache.getValue();
                if (form)
                  form.updateFieldAppearances();
              }
              return [4, this.flush()];
            case 1:
              _e.sent();
              Writer = useObjectStreams ? PDFStreamWriter : PDFWriter;
              return [2, Writer.forContext(this.context, objectsPerTick).serializeToBuffer()];
          }
        });
      });
    };
    PDFDocument2.prototype.saveAsBase64 = function(options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(this, void 0, void 0, function() {
        var _a2, dataUri, otherOptions, bytes, base642;
        return __generator(this, function(_b2) {
          switch (_b2.label) {
            case 0:
              _a2 = options.dataUri, dataUri = _a2 === void 0 ? false : _a2, otherOptions = __rest(options, ["dataUri"]);
              assertIs(dataUri, "dataUri", ["boolean"]);
              return [4, this.save(otherOptions)];
            case 1:
              bytes = _b2.sent();
              base642 = encodeToBase64(bytes);
              return [2, dataUri ? "data:application/pdf;base64," + base642 : base642];
          }
        });
      });
    };
    PDFDocument2.prototype.findPageForAnnotationRef = function(ref) {
      var pages = this.getPages();
      for (var idx = 0, len = pages.length; idx < len; idx++) {
        var page = pages[idx];
        var annotations = page.node.Annots();
        if ((annotations === null || annotations === void 0 ? void 0 : annotations.indexOf(ref)) !== void 0) {
          return page;
        }
      }
      return void 0;
    };
    PDFDocument2.prototype.embedAll = function(embeddables) {
      return __awaiter(this, void 0, void 0, function() {
        var idx, len;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              idx = 0, len = embeddables.length;
              _a2.label = 1;
            case 1:
              if (!(idx < len)) return [3, 4];
              return [4, embeddables[idx].embed()];
            case 2:
              _a2.sent();
              _a2.label = 3;
            case 3:
              idx++;
              return [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    PDFDocument2.prototype.updateInfoDict = function() {
      var pdfLib = "pdf-lib (https://github.com/Hopding/pdf-lib)";
      var now = /* @__PURE__ */ new Date();
      var info = this.getInfoDict();
      this.setProducer(pdfLib);
      this.setModificationDate(now);
      if (!info.get(PDFName.of("Creator")))
        this.setCreator(pdfLib);
      if (!info.get(PDFName.of("CreationDate")))
        this.setCreationDate(now);
    };
    PDFDocument2.prototype.getInfoDict = function() {
      var existingInfo = this.context.lookup(this.context.trailerInfo.Info);
      if (existingInfo instanceof PDFDict)
        return existingInfo;
      var newInfo = this.context.obj({});
      this.context.trailerInfo.Info = this.context.register(newInfo);
      return newInfo;
    };
    PDFDocument2.prototype.assertFontkit = function() {
      if (!this.fontkit)
        throw new FontkitNotRegisteredError();
      return this.fontkit;
    };
    return PDFDocument2;
  }()
);
function assertIsLiteralOrHexString(pdfObject) {
  if (!(pdfObject instanceof PDFHexString) && !(pdfObject instanceof PDFString)) {
    throw new UnexpectedObjectTypeError([PDFHexString, PDFString], pdfObject);
  }
}
var BlendMode;
(function(BlendMode2) {
  BlendMode2["Normal"] = "Normal";
  BlendMode2["Multiply"] = "Multiply";
  BlendMode2["Screen"] = "Screen";
  BlendMode2["Overlay"] = "Overlay";
  BlendMode2["Darken"] = "Darken";
  BlendMode2["Lighten"] = "Lighten";
  BlendMode2["ColorDodge"] = "ColorDodge";
  BlendMode2["ColorBurn"] = "ColorBurn";
  BlendMode2["HardLight"] = "HardLight";
  BlendMode2["SoftLight"] = "SoftLight";
  BlendMode2["Difference"] = "Difference";
  BlendMode2["Exclusion"] = "Exclusion";
})(BlendMode || (BlendMode = {}));
var PDFPage = (
  /** @class */
  function() {
    function PDFPage2(leafNode, ref, doc) {
      this.fontSize = 24;
      this.fontColor = rgb(0, 0, 0);
      this.lineHeight = 24;
      this.x = 0;
      this.y = 0;
      assertIs(leafNode, "leafNode", [[PDFPageLeaf, "PDFPageLeaf"]]);
      assertIs(ref, "ref", [[PDFRef, "PDFRef"]]);
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      this.node = leafNode;
      this.ref = ref;
      this.doc = doc;
    }
    PDFPage2.prototype.setRotation = function(angle) {
      var degreesAngle = toDegrees(angle);
      assertMultiple(degreesAngle, "degreesAngle", 90);
      this.node.set(PDFName.of("Rotate"), this.doc.context.obj(degreesAngle));
    };
    PDFPage2.prototype.getRotation = function() {
      var Rotate2 = this.node.Rotate();
      return degrees(Rotate2 ? Rotate2.asNumber() : 0);
    };
    PDFPage2.prototype.setSize = function(width, height) {
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var mediaBox = this.getMediaBox();
      this.setMediaBox(mediaBox.x, mediaBox.y, width, height);
      var cropBox = this.getCropBox();
      var bleedBox = this.getBleedBox();
      var trimBox = this.getTrimBox();
      var artBox = this.getArtBox();
      var hasCropBox = this.node.CropBox();
      var hasBleedBox = this.node.BleedBox();
      var hasTrimBox = this.node.TrimBox();
      var hasArtBox = this.node.ArtBox();
      if (hasCropBox && rectanglesAreEqual(cropBox, mediaBox)) {
        this.setCropBox(mediaBox.x, mediaBox.y, width, height);
      }
      if (hasBleedBox && rectanglesAreEqual(bleedBox, mediaBox)) {
        this.setBleedBox(mediaBox.x, mediaBox.y, width, height);
      }
      if (hasTrimBox && rectanglesAreEqual(trimBox, mediaBox)) {
        this.setTrimBox(mediaBox.x, mediaBox.y, width, height);
      }
      if (hasArtBox && rectanglesAreEqual(artBox, mediaBox)) {
        this.setArtBox(mediaBox.x, mediaBox.y, width, height);
      }
    };
    PDFPage2.prototype.setWidth = function(width) {
      assertIs(width, "width", ["number"]);
      this.setSize(width, this.getSize().height);
    };
    PDFPage2.prototype.setHeight = function(height) {
      assertIs(height, "height", ["number"]);
      this.setSize(this.getSize().width, height);
    };
    PDFPage2.prototype.setMediaBox = function(x, y, width, height) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var mediaBox = this.doc.context.obj([x, y, x + width, y + height]);
      this.node.set(PDFName.MediaBox, mediaBox);
    };
    PDFPage2.prototype.setCropBox = function(x, y, width, height) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var cropBox = this.doc.context.obj([x, y, x + width, y + height]);
      this.node.set(PDFName.CropBox, cropBox);
    };
    PDFPage2.prototype.setBleedBox = function(x, y, width, height) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var bleedBox = this.doc.context.obj([x, y, x + width, y + height]);
      this.node.set(PDFName.BleedBox, bleedBox);
    };
    PDFPage2.prototype.setTrimBox = function(x, y, width, height) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var trimBox = this.doc.context.obj([x, y, x + width, y + height]);
      this.node.set(PDFName.TrimBox, trimBox);
    };
    PDFPage2.prototype.setArtBox = function(x, y, width, height) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      assertIs(width, "width", ["number"]);
      assertIs(height, "height", ["number"]);
      var artBox = this.doc.context.obj([x, y, x + width, y + height]);
      this.node.set(PDFName.ArtBox, artBox);
    };
    PDFPage2.prototype.getSize = function() {
      var _a2 = this.getMediaBox(), width = _a2.width, height = _a2.height;
      return { width, height };
    };
    PDFPage2.prototype.getWidth = function() {
      return this.getSize().width;
    };
    PDFPage2.prototype.getHeight = function() {
      return this.getSize().height;
    };
    PDFPage2.prototype.getMediaBox = function() {
      var mediaBox = this.node.MediaBox();
      return mediaBox.asRectangle();
    };
    PDFPage2.prototype.getCropBox = function() {
      var _a2;
      var cropBox = this.node.CropBox();
      return (_a2 = cropBox === null || cropBox === void 0 ? void 0 : cropBox.asRectangle()) !== null && _a2 !== void 0 ? _a2 : this.getMediaBox();
    };
    PDFPage2.prototype.getBleedBox = function() {
      var _a2;
      var bleedBox = this.node.BleedBox();
      return (_a2 = bleedBox === null || bleedBox === void 0 ? void 0 : bleedBox.asRectangle()) !== null && _a2 !== void 0 ? _a2 : this.getCropBox();
    };
    PDFPage2.prototype.getTrimBox = function() {
      var _a2;
      var trimBox = this.node.TrimBox();
      return (_a2 = trimBox === null || trimBox === void 0 ? void 0 : trimBox.asRectangle()) !== null && _a2 !== void 0 ? _a2 : this.getCropBox();
    };
    PDFPage2.prototype.getArtBox = function() {
      var _a2;
      var artBox = this.node.ArtBox();
      return (_a2 = artBox === null || artBox === void 0 ? void 0 : artBox.asRectangle()) !== null && _a2 !== void 0 ? _a2 : this.getCropBox();
    };
    PDFPage2.prototype.translateContent = function(x, y) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      this.node.normalize();
      this.getContentStream();
      var start = this.createContentStream(pushGraphicsState(), translate(x, y));
      var startRef = this.doc.context.register(start);
      var end = this.createContentStream(popGraphicsState());
      var endRef = this.doc.context.register(end);
      this.node.wrapContentStreams(startRef, endRef);
    };
    PDFPage2.prototype.scale = function(x, y) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      this.setSize(this.getWidth() * x, this.getHeight() * y);
      this.scaleContent(x, y);
      this.scaleAnnotations(x, y);
    };
    PDFPage2.prototype.scaleContent = function(x, y) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      this.node.normalize();
      this.getContentStream();
      var start = this.createContentStream(pushGraphicsState(), scale(x, y));
      var startRef = this.doc.context.register(start);
      var end = this.createContentStream(popGraphicsState());
      var endRef = this.doc.context.register(end);
      this.node.wrapContentStreams(startRef, endRef);
    };
    PDFPage2.prototype.scaleAnnotations = function(x, y) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      var annots = this.node.Annots();
      if (!annots)
        return;
      for (var idx = 0; idx < annots.size(); idx++) {
        var annot = annots.lookup(idx);
        if (annot instanceof PDFDict)
          this.scaleAnnot(annot, x, y);
      }
    };
    PDFPage2.prototype.resetPosition = function() {
      this.getContentStream(false);
      this.x = 0;
      this.y = 0;
    };
    PDFPage2.prototype.setFont = function(font) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      this.font = font;
      this.fontKey = this.node.newFontDictionary(this.font.name, this.font.ref);
    };
    PDFPage2.prototype.setFontSize = function(fontSize) {
      assertIs(fontSize, "fontSize", ["number"]);
      this.fontSize = fontSize;
    };
    PDFPage2.prototype.setFontColor = function(fontColor) {
      assertIs(fontColor, "fontColor", [[Object, "Color"]]);
      this.fontColor = fontColor;
    };
    PDFPage2.prototype.setLineHeight = function(lineHeight) {
      assertIs(lineHeight, "lineHeight", ["number"]);
      this.lineHeight = lineHeight;
    };
    PDFPage2.prototype.getPosition = function() {
      return { x: this.x, y: this.y };
    };
    PDFPage2.prototype.getX = function() {
      return this.x;
    };
    PDFPage2.prototype.getY = function() {
      return this.y;
    };
    PDFPage2.prototype.moveTo = function(x, y) {
      assertIs(x, "x", ["number"]);
      assertIs(y, "y", ["number"]);
      this.x = x;
      this.y = y;
    };
    PDFPage2.prototype.moveDown = function(yDecrease) {
      assertIs(yDecrease, "yDecrease", ["number"]);
      this.y -= yDecrease;
    };
    PDFPage2.prototype.moveUp = function(yIncrease) {
      assertIs(yIncrease, "yIncrease", ["number"]);
      this.y += yIncrease;
    };
    PDFPage2.prototype.moveLeft = function(xDecrease) {
      assertIs(xDecrease, "xDecrease", ["number"]);
      this.x -= xDecrease;
    };
    PDFPage2.prototype.moveRight = function(xIncrease) {
      assertIs(xIncrease, "xIncrease", ["number"]);
      this.x += xIncrease;
    };
    PDFPage2.prototype.pushOperators = function() {
      var operator = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operator[_i] = arguments[_i];
      }
      assertEachIs(operator, "operator", [[PDFOperator, "PDFOperator"]]);
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, operator);
    };
    PDFPage2.prototype.drawText = function(text, options) {
      var _a2, _b2, _c, _d, _e, _f, _g;
      if (options === void 0) {
        options = {};
      }
      assertIs(text, "text", ["string"]);
      assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertOrUndefined(options.font, "options.font", [[PDFFont, "PDFFont"]]);
      assertOrUndefined(options.size, "options.size", ["number"]);
      assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
      assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
      assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
      assertOrUndefined(options.x, "options.x", ["number"]);
      assertOrUndefined(options.y, "options.y", ["number"]);
      assertOrUndefined(options.lineHeight, "options.lineHeight", ["number"]);
      assertOrUndefined(options.maxWidth, "options.maxWidth", ["number"]);
      assertOrUndefined(options.wordBreaks, "options.wordBreaks", [Array]);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var _h = this.setOrEmbedFont(options.font), oldFont = _h.oldFont, newFont = _h.newFont, newFontKey = _h.newFontKey;
      var fontSize = options.size || this.fontSize;
      var wordBreaks = options.wordBreaks || this.doc.defaultWordBreaks;
      var textWidth = function(t) {
        return newFont.widthOfTextAtSize(t, fontSize);
      };
      var lines = options.maxWidth === void 0 ? lineSplit(cleanText(text)) : breakTextIntoLines(text, wordBreaks, options.maxWidth, textWidth);
      var encodedLines = new Array(lines.length);
      for (var idx = 0, len = lines.length; idx < len; idx++) {
        encodedLines[idx] = newFont.encodeText(lines[idx]);
      }
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        opacity: options.opacity,
        blendMode: options.blendMode
      });
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawLinesOfText(encodedLines, {
        color: (_a2 = options.color) !== null && _a2 !== void 0 ? _a2 : this.fontColor,
        font: newFontKey,
        size: fontSize,
        rotate: (_b2 = options.rotate) !== null && _b2 !== void 0 ? _b2 : degrees(0),
        xSkew: (_c = options.xSkew) !== null && _c !== void 0 ? _c : degrees(0),
        ySkew: (_d = options.ySkew) !== null && _d !== void 0 ? _d : degrees(0),
        x: (_e = options.x) !== null && _e !== void 0 ? _e : this.x,
        y: (_f = options.y) !== null && _f !== void 0 ? _f : this.y,
        lineHeight: (_g = options.lineHeight) !== null && _g !== void 0 ? _g : this.lineHeight,
        graphicsState: graphicsStateKey
      }));
      if (options.font) {
        if (oldFont)
          this.setFont(oldFont);
        else
          this.resetFont();
      }
    };
    PDFPage2.prototype.drawImage = function(image, options) {
      var _a2, _b2, _c, _d, _e, _f, _g;
      if (options === void 0) {
        options = {};
      }
      assertIs(image, "image", [[PDFImage, "PDFImage"]]);
      assertOrUndefined(options.x, "options.x", ["number"]);
      assertOrUndefined(options.y, "options.y", ["number"]);
      assertOrUndefined(options.width, "options.width", ["number"]);
      assertOrUndefined(options.height, "options.height", ["number"]);
      assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
      assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
      assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var xObjectKey = this.node.newXObject("Image", image.ref);
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        opacity: options.opacity,
        blendMode: options.blendMode
      });
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawImage(xObjectKey, {
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : this.x,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : this.y,
        width: (_c = options.width) !== null && _c !== void 0 ? _c : image.size().width,
        height: (_d = options.height) !== null && _d !== void 0 ? _d : image.size().height,
        rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : degrees(0),
        xSkew: (_f = options.xSkew) !== null && _f !== void 0 ? _f : degrees(0),
        ySkew: (_g = options.ySkew) !== null && _g !== void 0 ? _g : degrees(0),
        graphicsState: graphicsStateKey
      }));
    };
    PDFPage2.prototype.drawPage = function(embeddedPage, options) {
      var _a2, _b2, _c, _d, _e;
      if (options === void 0) {
        options = {};
      }
      assertIs(embeddedPage, "embeddedPage", [
        [PDFEmbeddedPage, "PDFEmbeddedPage"]
      ]);
      assertOrUndefined(options.x, "options.x", ["number"]);
      assertOrUndefined(options.y, "options.y", ["number"]);
      assertOrUndefined(options.xScale, "options.xScale", ["number"]);
      assertOrUndefined(options.yScale, "options.yScale", ["number"]);
      assertOrUndefined(options.width, "options.width", ["number"]);
      assertOrUndefined(options.height, "options.height", ["number"]);
      assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
      assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
      assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var xObjectKey = this.node.newXObject("EmbeddedPdfPage", embeddedPage.ref);
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        opacity: options.opacity,
        blendMode: options.blendMode
      });
      var xScale = options.width !== void 0 ? options.width / embeddedPage.width : options.xScale !== void 0 ? options.xScale : 1;
      var yScale = options.height !== void 0 ? options.height / embeddedPage.height : options.yScale !== void 0 ? options.yScale : 1;
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawPage(xObjectKey, {
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : this.x,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : this.y,
        xScale,
        yScale,
        rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : degrees(0),
        xSkew: (_d = options.xSkew) !== null && _d !== void 0 ? _d : degrees(0),
        ySkew: (_e = options.ySkew) !== null && _e !== void 0 ? _e : degrees(0),
        graphicsState: graphicsStateKey
      }));
    };
    PDFPage2.prototype.drawSvgPath = function(path, options) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _j;
      if (options === void 0) {
        options = {};
      }
      assertIs(path, "path", ["string"]);
      assertOrUndefined(options.x, "options.x", ["number"]);
      assertOrUndefined(options.y, "options.y", ["number"]);
      assertOrUndefined(options.scale, "options.scale", ["number"]);
      assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
      assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
      assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertOrUndefined(options.borderColor, "options.borderColor", [
        [Object, "Color"]
      ]);
      assertOrUndefined(options.borderDashArray, "options.borderDashArray", [
        Array
      ]);
      assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", [
        "number"
      ]);
      assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", LineCapStyle);
      assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        opacity: options.opacity,
        borderOpacity: options.borderOpacity,
        blendMode: options.blendMode
      });
      if (!("color" in options) && !("borderColor" in options)) {
        options.borderColor = rgb(0, 0, 0);
      }
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawSvgPath(path, {
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : this.x,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : this.y,
        scale: options.scale,
        rotate: (_c = options.rotate) !== null && _c !== void 0 ? _c : degrees(0),
        color: (_d = options.color) !== null && _d !== void 0 ? _d : void 0,
        borderColor: (_e = options.borderColor) !== null && _e !== void 0 ? _e : void 0,
        borderWidth: (_f = options.borderWidth) !== null && _f !== void 0 ? _f : 0,
        borderDashArray: (_g = options.borderDashArray) !== null && _g !== void 0 ? _g : void 0,
        borderDashPhase: (_h = options.borderDashPhase) !== null && _h !== void 0 ? _h : void 0,
        borderLineCap: (_j = options.borderLineCap) !== null && _j !== void 0 ? _j : void 0,
        graphicsState: graphicsStateKey
      }));
    };
    PDFPage2.prototype.drawLine = function(options) {
      var _a2, _b2, _c, _d, _e;
      assertIs(options.start, "options.start", [
        [Object, "{ x: number, y: number }"]
      ]);
      assertIs(options.end, "options.end", [
        [Object, "{ x: number, y: number }"]
      ]);
      assertIs(options.start.x, "options.start.x", ["number"]);
      assertIs(options.start.y, "options.start.y", ["number"]);
      assertIs(options.end.x, "options.end.x", ["number"]);
      assertIs(options.end.y, "options.end.y", ["number"]);
      assertOrUndefined(options.thickness, "options.thickness", ["number"]);
      assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
      assertOrUndefined(options.dashArray, "options.dashArray", [Array]);
      assertOrUndefined(options.dashPhase, "options.dashPhase", ["number"]);
      assertIsOneOfOrUndefined(options.lineCap, "options.lineCap", LineCapStyle);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        borderOpacity: options.opacity,
        blendMode: options.blendMode
      });
      if (!("color" in options)) {
        options.color = rgb(0, 0, 0);
      }
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawLine({
        start: options.start,
        end: options.end,
        thickness: (_a2 = options.thickness) !== null && _a2 !== void 0 ? _a2 : 1,
        color: (_b2 = options.color) !== null && _b2 !== void 0 ? _b2 : void 0,
        dashArray: (_c = options.dashArray) !== null && _c !== void 0 ? _c : void 0,
        dashPhase: (_d = options.dashPhase) !== null && _d !== void 0 ? _d : void 0,
        lineCap: (_e = options.lineCap) !== null && _e !== void 0 ? _e : void 0,
        graphicsState: graphicsStateKey
      }));
    };
    PDFPage2.prototype.drawRectangle = function(options) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
      if (options === void 0) {
        options = {};
      }
      assertOrUndefined(options.x, "options.x", ["number"]);
      assertOrUndefined(options.y, "options.y", ["number"]);
      assertOrUndefined(options.width, "options.width", ["number"]);
      assertOrUndefined(options.height, "options.height", ["number"]);
      assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
      assertOrUndefined(options.xSkew, "options.xSkew", [[Object, "Rotation"]]);
      assertOrUndefined(options.ySkew, "options.ySkew", [[Object, "Rotation"]]);
      assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
      assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertOrUndefined(options.borderColor, "options.borderColor", [
        [Object, "Color"]
      ]);
      assertOrUndefined(options.borderDashArray, "options.borderDashArray", [
        Array
      ]);
      assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", [
        "number"
      ]);
      assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", LineCapStyle);
      assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        opacity: options.opacity,
        borderOpacity: options.borderOpacity,
        blendMode: options.blendMode
      });
      if (!("color" in options) && !("borderColor" in options)) {
        options.color = rgb(0, 0, 0);
      }
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawRectangle({
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : this.x,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : this.y,
        width: (_c = options.width) !== null && _c !== void 0 ? _c : 150,
        height: (_d = options.height) !== null && _d !== void 0 ? _d : 100,
        rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : degrees(0),
        xSkew: (_f = options.xSkew) !== null && _f !== void 0 ? _f : degrees(0),
        ySkew: (_g = options.ySkew) !== null && _g !== void 0 ? _g : degrees(0),
        borderWidth: (_h = options.borderWidth) !== null && _h !== void 0 ? _h : 0,
        color: (_j = options.color) !== null && _j !== void 0 ? _j : void 0,
        borderColor: (_k = options.borderColor) !== null && _k !== void 0 ? _k : void 0,
        borderDashArray: (_l = options.borderDashArray) !== null && _l !== void 0 ? _l : void 0,
        borderDashPhase: (_m = options.borderDashPhase) !== null && _m !== void 0 ? _m : void 0,
        graphicsState: graphicsStateKey,
        borderLineCap: (_o = options.borderLineCap) !== null && _o !== void 0 ? _o : void 0
      }));
    };
    PDFPage2.prototype.drawSquare = function(options) {
      if (options === void 0) {
        options = {};
      }
      var size = options.size;
      assertOrUndefined(size, "size", ["number"]);
      this.drawRectangle(__assign(__assign({}, options), { width: size, height: size }));
    };
    PDFPage2.prototype.drawEllipse = function(options) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      if (options === void 0) {
        options = {};
      }
      assertOrUndefined(options.x, "options.x", ["number"]);
      assertOrUndefined(options.y, "options.y", ["number"]);
      assertOrUndefined(options.xScale, "options.xScale", ["number"]);
      assertOrUndefined(options.yScale, "options.yScale", ["number"]);
      assertOrUndefined(options.rotate, "options.rotate", [[Object, "Rotation"]]);
      assertOrUndefined(options.color, "options.color", [[Object, "Color"]]);
      assertRangeOrUndefined(options.opacity, "opacity.opacity", 0, 1);
      assertOrUndefined(options.borderColor, "options.borderColor", [
        [Object, "Color"]
      ]);
      assertRangeOrUndefined(options.borderOpacity, "options.borderOpacity", 0, 1);
      assertOrUndefined(options.borderWidth, "options.borderWidth", ["number"]);
      assertOrUndefined(options.borderDashArray, "options.borderDashArray", [
        Array
      ]);
      assertOrUndefined(options.borderDashPhase, "options.borderDashPhase", [
        "number"
      ]);
      assertIsOneOfOrUndefined(options.borderLineCap, "options.borderLineCap", LineCapStyle);
      assertIsOneOfOrUndefined(options.blendMode, "options.blendMode", BlendMode);
      var graphicsStateKey = this.maybeEmbedGraphicsState({
        opacity: options.opacity,
        borderOpacity: options.borderOpacity,
        blendMode: options.blendMode
      });
      if (!("color" in options) && !("borderColor" in options)) {
        options.color = rgb(0, 0, 0);
      }
      var contentStream = this.getContentStream();
      contentStream.push.apply(contentStream, drawEllipse({
        x: (_a2 = options.x) !== null && _a2 !== void 0 ? _a2 : this.x,
        y: (_b2 = options.y) !== null && _b2 !== void 0 ? _b2 : this.y,
        xScale: (_c = options.xScale) !== null && _c !== void 0 ? _c : 100,
        yScale: (_d = options.yScale) !== null && _d !== void 0 ? _d : 100,
        rotate: (_e = options.rotate) !== null && _e !== void 0 ? _e : void 0,
        color: (_f = options.color) !== null && _f !== void 0 ? _f : void 0,
        borderColor: (_g = options.borderColor) !== null && _g !== void 0 ? _g : void 0,
        borderWidth: (_h = options.borderWidth) !== null && _h !== void 0 ? _h : 0,
        borderDashArray: (_j = options.borderDashArray) !== null && _j !== void 0 ? _j : void 0,
        borderDashPhase: (_k = options.borderDashPhase) !== null && _k !== void 0 ? _k : void 0,
        borderLineCap: (_l = options.borderLineCap) !== null && _l !== void 0 ? _l : void 0,
        graphicsState: graphicsStateKey
      }));
    };
    PDFPage2.prototype.drawCircle = function(options) {
      if (options === void 0) {
        options = {};
      }
      var _a2 = options.size, size = _a2 === void 0 ? 100 : _a2;
      assertOrUndefined(size, "size", ["number"]);
      this.drawEllipse(__assign(__assign({}, options), { xScale: size, yScale: size }));
    };
    PDFPage2.prototype.setOrEmbedFont = function(font) {
      var oldFont = this.font;
      var oldFontKey = this.fontKey;
      if (font)
        this.setFont(font);
      else
        this.getFont();
      var newFont = this.font;
      var newFontKey = this.fontKey;
      return { oldFont, oldFontKey, newFont, newFontKey };
    };
    PDFPage2.prototype.getFont = function() {
      if (!this.font || !this.fontKey) {
        var font = this.doc.embedStandardFont(StandardFonts.Helvetica);
        this.setFont(font);
      }
      return [this.font, this.fontKey];
    };
    PDFPage2.prototype.resetFont = function() {
      this.font = void 0;
      this.fontKey = void 0;
    };
    PDFPage2.prototype.getContentStream = function(useExisting) {
      if (useExisting === void 0) {
        useExisting = true;
      }
      if (useExisting && this.contentStream)
        return this.contentStream;
      this.contentStream = this.createContentStream();
      this.contentStreamRef = this.doc.context.register(this.contentStream);
      this.node.addContentStream(this.contentStreamRef);
      return this.contentStream;
    };
    PDFPage2.prototype.createContentStream = function() {
      var operators = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operators[_i] = arguments[_i];
      }
      var dict = this.doc.context.obj({});
      var contentStream = PDFContentStream.of(dict, operators);
      return contentStream;
    };
    PDFPage2.prototype.maybeEmbedGraphicsState = function(options) {
      var opacity = options.opacity, borderOpacity = options.borderOpacity, blendMode = options.blendMode;
      if (opacity === void 0 && borderOpacity === void 0 && blendMode === void 0) {
        return void 0;
      }
      var graphicsState = this.doc.context.obj({
        Type: "ExtGState",
        ca: opacity,
        CA: borderOpacity,
        BM: blendMode
      });
      var key = this.node.newExtGState("GS", graphicsState);
      return key;
    };
    PDFPage2.prototype.scaleAnnot = function(annot, x, y) {
      var selectors = ["RD", "CL", "Vertices", "QuadPoints", "L", "Rect"];
      for (var idx = 0, len = selectors.length; idx < len; idx++) {
        var list = annot.lookup(PDFName.of(selectors[idx]));
        if (list instanceof PDFArray)
          list.scalePDFNumbers(x, y);
      }
      var inkLists = annot.lookup(PDFName.of("InkList"));
      if (inkLists instanceof PDFArray) {
        for (var idx = 0, len = inkLists.size(); idx < len; idx++) {
          var arr = inkLists.lookup(idx);
          if (arr instanceof PDFArray)
            arr.scalePDFNumbers(x, y);
        }
      }
    };
    PDFPage2.of = function(leafNode, ref, doc) {
      return new PDFPage2(leafNode, ref, doc);
    };
    PDFPage2.create = function(doc) {
      assertIs(doc, "doc", [[PDFDocument, "PDFDocument"]]);
      var dummyRef = PDFRef.of(-1);
      var pageLeaf = PDFPageLeaf.withContextAndParent(doc.context, dummyRef);
      var pageRef = doc.context.register(pageLeaf);
      return new PDFPage2(pageLeaf, pageRef, doc);
    };
    return PDFPage2;
  }()
);
var PDFButton = (
  /** @class */
  function(_super) {
    __extends(PDFButton2, _super);
    function PDFButton2(acroPushButton, ref, doc) {
      var _this = _super.call(this, acroPushButton, ref, doc) || this;
      assertIs(acroPushButton, "acroButton", [
        [PDFAcroPushButton, "PDFAcroPushButton"]
      ]);
      _this.acroField = acroPushButton;
      return _this;
    }
    PDFButton2.prototype.setImage = function(image, alignment) {
      if (alignment === void 0) {
        alignment = ImageAlignment.Center;
      }
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var streamRef = this.createImageAppearanceStream(widget, image, alignment);
        this.updateWidgetAppearances(widget, { normal: streamRef });
      }
      this.markAsClean();
    };
    PDFButton2.prototype.setFontSize = function(fontSize) {
      assertPositive(fontSize, "fontSize");
      this.acroField.setFontSize(fontSize);
      this.markAsDirty();
    };
    PDFButton2.prototype.addToPage = function(text, page, options) {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      assertOrUndefined(text, "text", ["string"]);
      assertOrUndefined(page, "page", [[PDFPage, "PDFPage"]]);
      assertFieldAppearanceOptions(options);
      var widget = this.createWidget({
        x: ((_a2 = options === null || options === void 0 ? void 0 : options.x) !== null && _a2 !== void 0 ? _a2 : 0) - ((_b2 = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _b2 !== void 0 ? _b2 : 0) / 2,
        y: ((_c = options === null || options === void 0 ? void 0 : options.y) !== null && _c !== void 0 ? _c : 0) - ((_d = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _d !== void 0 ? _d : 0) / 2,
        width: (_e = options === null || options === void 0 ? void 0 : options.width) !== null && _e !== void 0 ? _e : 100,
        height: (_f = options === null || options === void 0 ? void 0 : options.height) !== null && _f !== void 0 ? _f : 50,
        textColor: (_g = options === null || options === void 0 ? void 0 : options.textColor) !== null && _g !== void 0 ? _g : rgb(0, 0, 0),
        backgroundColor: (_h = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _h !== void 0 ? _h : rgb(0.75, 0.75, 0.75),
        borderColor: options === null || options === void 0 ? void 0 : options.borderColor,
        borderWidth: (_j = options === null || options === void 0 ? void 0 : options.borderWidth) !== null && _j !== void 0 ? _j : 0,
        rotate: (_k = options === null || options === void 0 ? void 0 : options.rotate) !== null && _k !== void 0 ? _k : degrees(0),
        caption: text,
        hidden: options === null || options === void 0 ? void 0 : options.hidden,
        page: page.ref
      });
      var widgetRef = this.doc.context.register(widget.dict);
      this.acroField.addWidget(widgetRef);
      var font = (_l = options === null || options === void 0 ? void 0 : options.font) !== null && _l !== void 0 ? _l : this.doc.getForm().getDefaultFont();
      this.updateWidgetAppearance(widget, font);
      page.node.addAnnot(widgetRef);
    };
    PDFButton2.prototype.needsAppearancesUpdate = function() {
      var _a2;
      if (this.isDirty())
        return true;
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        var hasAppearances = ((_a2 = widget.getAppearances()) === null || _a2 === void 0 ? void 0 : _a2.normal) instanceof PDFStream;
        if (!hasAppearances)
          return true;
      }
      return false;
    };
    PDFButton2.prototype.defaultUpdateAppearances = function(font) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      this.updateAppearances(font);
    };
    PDFButton2.prototype.updateAppearances = function(font, provider) {
      assertIs(font, "font", [[PDFFont, "PDFFont"]]);
      assertOrUndefined(provider, "provider", [Function]);
      var widgets = this.acroField.getWidgets();
      for (var idx = 0, len = widgets.length; idx < len; idx++) {
        var widget = widgets[idx];
        this.updateWidgetAppearance(widget, font, provider);
      }
    };
    PDFButton2.prototype.updateWidgetAppearance = function(widget, font, provider) {
      var apProvider = provider !== null && provider !== void 0 ? provider : defaultButtonAppearanceProvider;
      var appearances = normalizeAppearance(apProvider(this, widget, font));
      this.updateWidgetAppearanceWithFont(widget, font, appearances);
    };
    PDFButton2.of = function(acroPushButton, ref, doc) {
      return new PDFButton2(acroPushButton, ref, doc);
    };
    return PDFButton2;
  }(PDFField)
);
const pdfjsWorker = "/assets/pdf.worker.min-yatZIOMy.mjs";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var utf8$5 = {};
var utils$j = {};
var support$4 = {};
var nodestream;
var blob;
support$4.base64 = true;
support$4.array = true;
support$4.string = true;
support$4.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
support$4.nodebuffer = typeof Buffer !== "undefined";
support$4.uint8array = typeof Uint8Array !== "undefined";
if (typeof ArrayBuffer === "undefined") {
  blob = support$4.blob = false;
} else {
  var buffer = new ArrayBuffer(0);
  try {
    blob = support$4.blob = new Blob([buffer], {
      type: "application/zip"
    }).size === 0;
  } catch (e) {
    try {
      var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
      var builder = new Builder();
      builder.append(buffer);
      blob = support$4.blob = builder.getBlob("application/zip").size === 0;
    } catch (e2) {
      blob = support$4.blob = false;
    }
  }
}
try {
  nodestream = support$4.nodestream = !!require("readable-stream").Readable;
} catch (e) {
  nodestream = support$4.nodestream = false;
}
var base64$1 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64) return base64$1;
  hasRequiredBase64 = 1;
  var utils2 = requireUtils();
  var support2 = support$4;
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  base64$1.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;
    var isArray = utils2.getTypeOf(input) !== "string";
    while (i < input.length) {
      remainingBytes = len - i;
      if (!isArray) {
        chr1 = input.charCodeAt(i++);
        chr2 = i < len ? input.charCodeAt(i++) : 0;
        chr3 = i < len ? input.charCodeAt(i++) : 0;
      } else {
        chr1 = input[i++];
        chr2 = i < len ? input[i++] : 0;
        chr3 = i < len ? input[i++] : 0;
      }
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
      enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
      output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
    }
    return output.join("");
  };
  base64$1.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;
    var dataUrlPrefix = "data:";
    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
      throw new Error("Invalid base64 input, it looks like a data url.");
    }
    input = input.replace(/[^A-Za-z0-9+/=]/g, "");
    var totalLength = input.length * 3 / 4;
    if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (totalLength % 1 !== 0) {
      throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support2.uint8array) {
      output = new Uint8Array(totalLength | 0);
    } else {
      output = new Array(totalLength | 0);
    }
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output[resultIndex++] = chr1;
      if (enc3 !== 64) {
        output[resultIndex++] = chr2;
      }
      if (enc4 !== 64) {
        output[resultIndex++] = chr3;
      }
    }
    return output;
  };
  return base64$1;
}
var nodejsUtils$2 = {
  /**
   * True if this is running in Nodejs, will be undefined in a browser.
   * In a browser, browserify won't include this file and the whole module
   * will be resolved an empty object.
   */
  isNode: typeof Buffer !== "undefined",
  /**
   * Create a new nodejs Buffer from an existing content.
   * @param {Object} data the data to pass to the constructor.
   * @param {String} encoding the encoding to use.
   * @return {Buffer} a new Buffer.
   */
  newBufferFrom: function(data, encoding) {
    if (Buffer.from && Buffer.from !== Uint8Array.from) {
      return Buffer.from(data, encoding);
    } else {
      if (typeof data === "number") {
        throw new Error('The "data" argument must not be a number');
      }
      return new Buffer(data, encoding);
    }
  },
  /**
   * Create a new nodejs Buffer with the specified size.
   * @param {Integer} size the size of the buffer.
   * @return {Buffer} a new Buffer.
   */
  allocBuffer: function(size) {
    if (Buffer.alloc) {
      return Buffer.alloc(size);
    } else {
      var buf = new Buffer(size);
      buf.fill(0);
      return buf;
    }
  },
  /**
   * Find out if an object is a Buffer.
   * @param {Object} b the object to test.
   * @return {Boolean} true if the object is a Buffer, false otherwise.
   */
  isBuffer: function(b) {
    return Buffer.isBuffer(b);
  },
  isStream: function(obj) {
    return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
  }
};
var ES6Promise = null;
if (typeof Promise !== "undefined") {
  ES6Promise = Promise;
} else {
  ES6Promise = require$$0;
}
var external$3 = {
  Promise: ES6Promise
};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils$j;
  hasRequiredUtils = 1;
  (function(exports$1) {
    var support2 = support$4;
    var base642 = requireBase64();
    var nodejsUtils2 = nodejsUtils$2;
    var external2 = external$3;
    function string2binary(str) {
      var result = null;
      if (support2.uint8array) {
        result = new Uint8Array(str.length);
      } else {
        result = new Array(str.length);
      }
      return stringToArrayLike(str, result);
    }
    exports$1.newBlob = function(part, type) {
      exports$1.checkSupport("blob");
      try {
        return new Blob([part], {
          type
        });
      } catch (e) {
        try {
          var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
          var builder = new Builder();
          builder.append(part);
          return builder.getBlob(type);
        } catch (e2) {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function identity(input) {
      return input;
    }
    function stringToArrayLike(str, array) {
      for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 255;
      }
      return array;
    }
    var arrayToStringHelper = {
      /**
       * Transform an array of int into a string, chunk by chunk.
       * See the performances notes on arrayLikeToString.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @param {String} type the type of the array.
       * @param {Integer} chunk the chunk size.
       * @return {String} the resulting string.
       * @throws Error if the chunk is too big for the stack.
       */
      stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        if (len <= chunk) {
          return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
          if (type === "array" || type === "nodebuffer") {
            result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
          } else {
            result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
          }
          k += chunk;
        }
        return result.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(array) {
        var resultStr = "";
        for (var i = 0; i < array.length; i++) {
          resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
      },
      applyCanBeUsed: {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array: function() {
          try {
            return support2.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch (e) {
            return false;
          }
        }(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer: function() {
          try {
            return support2.nodebuffer && String.fromCharCode.apply(null, nodejsUtils2.allocBuffer(1)).length === 1;
          } catch (e) {
            return false;
          }
        }()
      }
    };
    function arrayLikeToString(array) {
      var chunk = 65536, type = exports$1.getTypeOf(array), canUseApply = true;
      if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
      } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
      }
      if (canUseApply) {
        while (chunk > 1) {
          try {
            return arrayToStringHelper.stringifyByChunk(array, type, chunk);
          } catch (e) {
            chunk = Math.floor(chunk / 2);
          }
        }
      }
      return arrayToStringHelper.stringifyByChar(array);
    }
    exports$1.applyFromCharCode = arrayLikeToString;
    function arrayLikeToArrayLike(arrayFrom, arrayTo) {
      for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
      }
      return arrayTo;
    }
    var transform = {};
    transform["string"] = {
      "string": identity,
      "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
      },
      "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
      },
      "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils2.allocBuffer(input.length));
      }
    };
    transform["array"] = {
      "string": arrayLikeToString,
      "array": identity,
      "arraybuffer": function(input) {
        return new Uint8Array(input).buffer;
      },
      "uint8array": function(input) {
        return new Uint8Array(input);
      },
      "nodebuffer": function(input) {
        return nodejsUtils2.newBufferFrom(input);
      }
    };
    transform["arraybuffer"] = {
      "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
      },
      "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
      },
      "arraybuffer": identity,
      "uint8array": function(input) {
        return new Uint8Array(input);
      },
      "nodebuffer": function(input) {
        return nodejsUtils2.newBufferFrom(new Uint8Array(input));
      }
    };
    transform["uint8array"] = {
      "string": arrayLikeToString,
      "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return input.buffer;
      },
      "uint8array": identity,
      "nodebuffer": function(input) {
        return nodejsUtils2.newBufferFrom(input);
      }
    };
    transform["nodebuffer"] = {
      "string": arrayLikeToString,
      "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
      },
      "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
      },
      "nodebuffer": identity
    };
    exports$1.transformTo = function(outputType, input) {
      if (!input) {
        input = "";
      }
      if (!outputType) {
        return input;
      }
      exports$1.checkSupport(outputType);
      var inputType = exports$1.getTypeOf(input);
      var result = transform[inputType][outputType](input);
      return result;
    };
    exports$1.resolve = function(path) {
      var parts = path.split("/");
      var result = [];
      for (var index = 0; index < parts.length; index++) {
        var part = parts[index];
        if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
          continue;
        } else if (part === "..") {
          result.pop();
        } else {
          result.push(part);
        }
      }
      return result.join("/");
    };
    exports$1.getTypeOf = function(input) {
      if (typeof input === "string") {
        return "string";
      }
      if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
      }
      if (support2.nodebuffer && nodejsUtils2.isBuffer(input)) {
        return "nodebuffer";
      }
      if (support2.uint8array && input instanceof Uint8Array) {
        return "uint8array";
      }
      if (support2.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
      }
    };
    exports$1.checkSupport = function(type) {
      var supported = support2[type.toLowerCase()];
      if (!supported) {
        throw new Error(type + " is not supported by this platform");
      }
    };
    exports$1.MAX_VALUE_16BITS = 65535;
    exports$1.MAX_VALUE_32BITS = -1;
    exports$1.pretty = function(str) {
      var res = "", code, i;
      for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
      }
      return res;
    };
    exports$1.delay = function(callback, args, self2) {
      setImmediate(function() {
        callback.apply(self2 || null, args || []);
      });
    };
    exports$1.inherits = function(ctor, superCtor) {
      var Obj = function() {
      };
      Obj.prototype = superCtor.prototype;
      ctor.prototype = new Obj();
    };
    exports$1.extend = function() {
      var result = {}, i, attr;
      for (i = 0; i < arguments.length; i++) {
        for (attr in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {
            result[attr] = arguments[i][attr];
          }
        }
      }
      return result;
    };
    exports$1.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
      var promise = external2.Promise.resolve(inputData).then(function(data) {
        var isBlob = support2.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);
        if (isBlob && typeof FileReader !== "undefined") {
          return new external2.Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
              resolve(e.target.result);
            };
            reader.onerror = function(e) {
              reject(e.target.error);
            };
            reader.readAsArrayBuffer(data);
          });
        } else {
          return data;
        }
      });
      return promise.then(function(data) {
        var dataType = exports$1.getTypeOf(data);
        if (!dataType) {
          return external2.Promise.reject(
            new Error("Can't read the data of '" + name + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
          );
        }
        if (dataType === "arraybuffer") {
          data = exports$1.transformTo("uint8array", data);
        } else if (dataType === "string") {
          if (isBase64) {
            data = base642.decode(data);
          } else if (isBinary) {
            if (isOptimizedBinaryString !== true) {
              data = string2binary(data);
            }
          }
        }
        return data;
      });
    };
  })(utils$j);
  return utils$j;
}
function GenericWorker$b(name) {
  this.name = name || "default";
  this.streamInfo = {};
  this.generatedError = null;
  this.extraStreamInfo = {};
  this.isPaused = true;
  this.isFinished = false;
  this.isLocked = false;
  this._listeners = {
    "data": [],
    "end": [],
    "error": []
  };
  this.previous = null;
}
GenericWorker$b.prototype = {
  /**
   * Push a chunk to the next workers.
   * @param {Object} chunk the chunk to push
   */
  push: function(chunk) {
    this.emit("data", chunk);
  },
  /**
   * End the stream.
   * @return {Boolean} true if this call ended the worker, false otherwise.
   */
  end: function() {
    if (this.isFinished) {
      return false;
    }
    this.flush();
    try {
      this.emit("end");
      this.cleanUp();
      this.isFinished = true;
    } catch (e) {
      this.emit("error", e);
    }
    return true;
  },
  /**
   * End the stream with an error.
   * @param {Error} e the error which caused the premature end.
   * @return {Boolean} true if this call ended the worker with an error, false otherwise.
   */
  error: function(e) {
    if (this.isFinished) {
      return false;
    }
    if (this.isPaused) {
      this.generatedError = e;
    } else {
      this.isFinished = true;
      this.emit("error", e);
      if (this.previous) {
        this.previous.error(e);
      }
      this.cleanUp();
    }
    return true;
  },
  /**
   * Add a callback on an event.
   * @param {String} name the name of the event (data, end, error)
   * @param {Function} listener the function to call when the event is triggered
   * @return {GenericWorker} the current object for chainability
   */
  on: function(name, listener) {
    this._listeners[name].push(listener);
    return this;
  },
  /**
   * Clean any references when a worker is ending.
   */
  cleanUp: function() {
    this.streamInfo = this.generatedError = this.extraStreamInfo = null;
    this._listeners = [];
  },
  /**
   * Trigger an event. This will call registered callback with the provided arg.
   * @param {String} name the name of the event (data, end, error)
   * @param {Object} arg the argument to call the callback with.
   */
  emit: function(name, arg) {
    if (this._listeners[name]) {
      for (var i = 0; i < this._listeners[name].length; i++) {
        this._listeners[name][i].call(this, arg);
      }
    }
  },
  /**
   * Chain a worker with an other.
   * @param {Worker} next the worker receiving events from the current one.
   * @return {worker} the next worker for chainability
   */
  pipe: function(next) {
    return next.registerPrevious(this);
  },
  /**
   * Same as `pipe` in the other direction.
   * Using an API with `pipe(next)` is very easy.
   * Implementing the API with the point of view of the next one registering
   * a source is easier, see the ZipFileWorker.
   * @param {Worker} previous the previous worker, sending events to this one
   * @return {Worker} the current worker for chainability
   */
  registerPrevious: function(previous) {
    if (this.isLocked) {
      throw new Error("The stream '" + this + "' has already been used.");
    }
    this.streamInfo = previous.streamInfo;
    this.mergeStreamInfo();
    this.previous = previous;
    var self2 = this;
    previous.on("data", function(chunk) {
      self2.processChunk(chunk);
    });
    previous.on("end", function() {
      self2.end();
    });
    previous.on("error", function(e) {
      self2.error(e);
    });
    return this;
  },
  /**
   * Pause the stream so it doesn't send events anymore.
   * @return {Boolean} true if this call paused the worker, false otherwise.
   */
  pause: function() {
    if (this.isPaused || this.isFinished) {
      return false;
    }
    this.isPaused = true;
    if (this.previous) {
      this.previous.pause();
    }
    return true;
  },
  /**
   * Resume a paused stream.
   * @return {Boolean} true if this call resumed the worker, false otherwise.
   */
  resume: function() {
    if (!this.isPaused || this.isFinished) {
      return false;
    }
    this.isPaused = false;
    var withError = false;
    if (this.generatedError) {
      this.error(this.generatedError);
      withError = true;
    }
    if (this.previous) {
      this.previous.resume();
    }
    return !withError;
  },
  /**
   * Flush any remaining bytes as the stream is ending.
   */
  flush: function() {
  },
  /**
   * Process a chunk. This is usually the method overridden.
   * @param {Object} chunk the chunk to process.
   */
  processChunk: function(chunk) {
    this.push(chunk);
  },
  /**
   * Add a key/value to be added in the workers chain streamInfo once activated.
   * @param {String} key the key to use
   * @param {Object} value the associated value
   * @return {Worker} the current worker for chainability
   */
  withStreamInfo: function(key, value) {
    this.extraStreamInfo[key] = value;
    this.mergeStreamInfo();
    return this;
  },
  /**
   * Merge this worker's streamInfo into the chain's streamInfo.
   */
  mergeStreamInfo: function() {
    for (var key in this.extraStreamInfo) {
      if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) {
        continue;
      }
      this.streamInfo[key] = this.extraStreamInfo[key];
    }
  },
  /**
   * Lock the stream to prevent further updates on the workers chain.
   * After calling this method, all calls to pipe will fail.
   */
  lock: function() {
    if (this.isLocked) {
      throw new Error("The stream '" + this + "' has already been used.");
    }
    this.isLocked = true;
    if (this.previous) {
      this.previous.lock();
    }
  },
  /**
   *
   * Pretty print the workers chain.
   */
  toString: function() {
    var me = "Worker " + this.name;
    if (this.previous) {
      return this.previous + " -> " + me;
    } else {
      return me;
    }
  }
};
var GenericWorker_1 = GenericWorker$b;
(function(exports$1) {
  var utils2 = requireUtils();
  var support2 = support$4;
  var nodejsUtils2 = nodejsUtils$2;
  var GenericWorker2 = GenericWorker_1;
  var _utf8len = new Array(256);
  for (var i = 0; i < 256; i++) {
    _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  }
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = function(str) {
    var buf, c, c2, m_pos, i2, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    if (support2.uint8array) {
      buf = new Uint8Array(buf_len);
    } else {
      buf = new Array(buf_len);
    }
    for (i2 = 0, m_pos = 0; i2 < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i2++] = c;
      } else if (c < 2048) {
        buf[i2++] = 192 | c >>> 6;
        buf[i2++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i2++] = 224 | c >>> 12;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      } else {
        buf[i2++] = 240 | c >>> 18;
        buf[i2++] = 128 | c >>> 12 & 63;
        buf[i2++] = 128 | c >>> 6 & 63;
        buf[i2++] = 128 | c & 63;
      }
    }
    return buf;
  };
  var utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
  var buf2string = function(buf) {
    var i2, out2, c, c_len;
    var len = buf.length;
    var utf16buf = new Array(len * 2);
    for (out2 = 0, i2 = 0; i2 < len; ) {
      c = buf[i2++];
      if (c < 128) {
        utf16buf[out2++] = c;
        continue;
      }
      c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out2++] = 65533;
        i2 += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i2 < len) {
        c = c << 6 | buf[i2++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out2++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out2++] = c;
      } else {
        c -= 65536;
        utf16buf[out2++] = 55296 | c >> 10 & 1023;
        utf16buf[out2++] = 56320 | c & 1023;
      }
    }
    if (utf16buf.length !== out2) {
      if (utf16buf.subarray) {
        utf16buf = utf16buf.subarray(0, out2);
      } else {
        utf16buf.length = out2;
      }
    }
    return utils2.applyFromCharCode(utf16buf);
  };
  exports$1.utf8encode = function utf8encode(str) {
    if (support2.nodebuffer) {
      return nodejsUtils2.newBufferFrom(str, "utf-8");
    }
    return string2buf(str);
  };
  exports$1.utf8decode = function utf8decode(buf) {
    if (support2.nodebuffer) {
      return utils2.transformTo("nodebuffer", buf).toString("utf-8");
    }
    buf = utils2.transformTo(support2.uint8array ? "uint8array" : "array", buf);
    return buf2string(buf);
  };
  function Utf8DecodeWorker() {
    GenericWorker2.call(this, "utf-8 decode");
    this.leftOver = null;
  }
  utils2.inherits(Utf8DecodeWorker, GenericWorker2);
  Utf8DecodeWorker.prototype.processChunk = function(chunk) {
    var data = utils2.transformTo(support2.uint8array ? "uint8array" : "array", chunk.data);
    if (this.leftOver && this.leftOver.length) {
      if (support2.uint8array) {
        var previousData = data;
        data = new Uint8Array(previousData.length + this.leftOver.length);
        data.set(this.leftOver, 0);
        data.set(previousData, this.leftOver.length);
      } else {
        data = this.leftOver.concat(data);
      }
      this.leftOver = null;
    }
    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
      if (support2.uint8array) {
        usableData = data.subarray(0, nextBoundary);
        this.leftOver = data.subarray(nextBoundary, data.length);
      } else {
        usableData = data.slice(0, nextBoundary);
        this.leftOver = data.slice(nextBoundary, data.length);
      }
    }
    this.push({
      data: exports$1.utf8decode(usableData),
      meta: chunk.meta
    });
  };
  Utf8DecodeWorker.prototype.flush = function() {
    if (this.leftOver && this.leftOver.length) {
      this.push({
        data: exports$1.utf8decode(this.leftOver),
        meta: {}
      });
      this.leftOver = null;
    }
  };
  exports$1.Utf8DecodeWorker = Utf8DecodeWorker;
  function Utf8EncodeWorker() {
    GenericWorker2.call(this, "utf-8 encode");
  }
  utils2.inherits(Utf8EncodeWorker, GenericWorker2);
  Utf8EncodeWorker.prototype.processChunk = function(chunk) {
    this.push({
      data: exports$1.utf8encode(chunk.data),
      meta: chunk.meta
    });
  };
  exports$1.Utf8EncodeWorker = Utf8EncodeWorker;
})(utf8$5);
var GenericWorker$a = GenericWorker_1;
var utils$i = requireUtils();
function ConvertWorker$1(destType) {
  GenericWorker$a.call(this, "ConvertWorker to " + destType);
  this.destType = destType;
}
utils$i.inherits(ConvertWorker$1, GenericWorker$a);
ConvertWorker$1.prototype.processChunk = function(chunk) {
  this.push({
    data: utils$i.transformTo(this.destType, chunk.data),
    meta: chunk.meta
  });
};
var ConvertWorker_1 = ConvertWorker$1;
var NodejsStreamOutputAdapter_1;
var hasRequiredNodejsStreamOutputAdapter;
function requireNodejsStreamOutputAdapter() {
  if (hasRequiredNodejsStreamOutputAdapter) return NodejsStreamOutputAdapter_1;
  hasRequiredNodejsStreamOutputAdapter = 1;
  var Readable = require$$0$1.Readable;
  var utils2 = requireUtils();
  utils2.inherits(NodejsStreamOutputAdapter2, Readable);
  function NodejsStreamOutputAdapter2(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;
    var self2 = this;
    helper.on("data", function(data, meta) {
      if (!self2.push(data)) {
        self2._helper.pause();
      }
      if (updateCb) {
        updateCb(meta);
      }
    }).on("error", function(e) {
      self2.emit("error", e);
    }).on("end", function() {
      self2.push(null);
    });
  }
  NodejsStreamOutputAdapter2.prototype._read = function() {
    this._helper.resume();
  };
  NodejsStreamOutputAdapter_1 = NodejsStreamOutputAdapter2;
  return NodejsStreamOutputAdapter_1;
}
var utils$h = requireUtils();
var ConvertWorker = ConvertWorker_1;
var GenericWorker$9 = GenericWorker_1;
var base64 = requireBase64();
var support$3 = support$4;
var external$2 = external$3;
var NodejsStreamOutputAdapter = null;
if (support$3.nodestream) {
  try {
    NodejsStreamOutputAdapter = requireNodejsStreamOutputAdapter();
  } catch (e) {
  }
}
function transformZipOutput(type, content, mimeType) {
  switch (type) {
    case "blob":
      return utils$h.newBlob(utils$h.transformTo("arraybuffer", content), mimeType);
    case "base64":
      return base64.encode(content);
    default:
      return utils$h.transformTo(type, content);
  }
}
function concat(type, dataArray) {
  var i, index = 0, res = null, totalLength = 0;
  for (i = 0; i < dataArray.length; i++) {
    totalLength += dataArray[i].length;
  }
  switch (type) {
    case "string":
      return dataArray.join("");
    case "array":
      return Array.prototype.concat.apply([], dataArray);
    case "uint8array":
      res = new Uint8Array(totalLength);
      for (i = 0; i < dataArray.length; i++) {
        res.set(dataArray[i], index);
        index += dataArray[i].length;
      }
      return res;
    case "nodebuffer":
      return Buffer.concat(dataArray);
    default:
      throw new Error("concat : unsupported type '" + type + "'");
  }
}
function accumulate(helper, updateCallback) {
  return new external$2.Promise(function(resolve, reject) {
    var dataArray = [];
    var chunkType = helper._internalType, resultType = helper._outputType, mimeType = helper._mimeType;
    helper.on("data", function(data, meta) {
      dataArray.push(data);
      if (updateCallback) {
        updateCallback(meta);
      }
    }).on("error", function(err) {
      dataArray = [];
      reject(err);
    }).on("end", function() {
      try {
        var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
        resolve(result);
      } catch (e) {
        reject(e);
      }
      dataArray = [];
    }).resume();
  });
}
function StreamHelper$2(worker, outputType, mimeType) {
  var internalType = outputType;
  switch (outputType) {
    case "blob":
    case "arraybuffer":
      internalType = "uint8array";
      break;
    case "base64":
      internalType = "string";
      break;
  }
  try {
    this._internalType = internalType;
    this._outputType = outputType;
    this._mimeType = mimeType;
    utils$h.checkSupport(internalType);
    this._worker = worker.pipe(new ConvertWorker(internalType));
    worker.lock();
  } catch (e) {
    this._worker = new GenericWorker$9("error");
    this._worker.error(e);
  }
}
StreamHelper$2.prototype = {
  /**
   * Listen a StreamHelper, accumulate its content and concatenate it into a
   * complete block.
   * @param {Function} updateCb the update callback.
   * @return Promise the promise for the accumulation.
   */
  accumulate: function(updateCb) {
    return accumulate(this, updateCb);
  },
  /**
   * Add a listener on an event triggered on a stream.
   * @param {String} evt the name of the event
   * @param {Function} fn the listener
   * @return {StreamHelper} the current helper.
   */
  on: function(evt, fn) {
    var self2 = this;
    if (evt === "data") {
      this._worker.on(evt, function(chunk) {
        fn.call(self2, chunk.data, chunk.meta);
      });
    } else {
      this._worker.on(evt, function() {
        utils$h.delay(fn, arguments, self2);
      });
    }
    return this;
  },
  /**
   * Resume the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  resume: function() {
    utils$h.delay(this._worker.resume, [], this._worker);
    return this;
  },
  /**
   * Pause the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  pause: function() {
    this._worker.pause();
    return this;
  },
  /**
   * Return a nodejs stream for this helper.
   * @param {Function} updateCb the update callback.
   * @return {NodejsStreamOutputAdapter} the nodejs stream.
   */
  toNodejsStream: function(updateCb) {
    utils$h.checkSupport("nodestream");
    if (this._outputType !== "nodebuffer") {
      throw new Error(this._outputType + " is not supported by this method");
    }
    return new NodejsStreamOutputAdapter(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, updateCb);
  }
};
var StreamHelper_1 = StreamHelper$2;
var defaults$1 = {};
defaults$1.base64 = false;
defaults$1.binary = false;
defaults$1.dir = false;
defaults$1.createFolders = true;
defaults$1.date = null;
defaults$1.compression = null;
defaults$1.compressionOptions = null;
defaults$1.comment = null;
defaults$1.unixPermissions = null;
defaults$1.dosPermissions = null;
var utils$g = requireUtils();
var GenericWorker$8 = GenericWorker_1;
var DEFAULT_BLOCK_SIZE = 16 * 1024;
function DataWorker$2(dataP) {
  GenericWorker$8.call(this, "DataWorker");
  var self2 = this;
  this.dataIsReady = false;
  this.index = 0;
  this.max = 0;
  this.data = null;
  this.type = "";
  this._tickScheduled = false;
  dataP.then(function(data) {
    self2.dataIsReady = true;
    self2.data = data;
    self2.max = data && data.length || 0;
    self2.type = utils$g.getTypeOf(data);
    if (!self2.isPaused) {
      self2._tickAndRepeat();
    }
  }, function(e) {
    self2.error(e);
  });
}
utils$g.inherits(DataWorker$2, GenericWorker$8);
DataWorker$2.prototype.cleanUp = function() {
  GenericWorker$8.prototype.cleanUp.call(this);
  this.data = null;
};
DataWorker$2.prototype.resume = function() {
  if (!GenericWorker$8.prototype.resume.call(this)) {
    return false;
  }
  if (!this._tickScheduled && this.dataIsReady) {
    this._tickScheduled = true;
    utils$g.delay(this._tickAndRepeat, [], this);
  }
  return true;
};
DataWorker$2.prototype._tickAndRepeat = function() {
  this._tickScheduled = false;
  if (this.isPaused || this.isFinished) {
    return;
  }
  this._tick();
  if (!this.isFinished) {
    utils$g.delay(this._tickAndRepeat, [], this);
    this._tickScheduled = true;
  }
};
DataWorker$2.prototype._tick = function() {
  if (this.isPaused || this.isFinished) {
    return false;
  }
  var size = DEFAULT_BLOCK_SIZE;
  var data = null, nextIndex = Math.min(this.max, this.index + size);
  if (this.index >= this.max) {
    return this.end();
  } else {
    switch (this.type) {
      case "string":
        data = this.data.substring(this.index, nextIndex);
        break;
      case "uint8array":
        data = this.data.subarray(this.index, nextIndex);
        break;
      case "array":
      case "nodebuffer":
        data = this.data.slice(this.index, nextIndex);
        break;
    }
    this.index = nextIndex;
    return this.push({
      data,
      meta: {
        percent: this.max ? this.index / this.max * 100 : 0
      }
    });
  }
};
var DataWorker_1 = DataWorker$2;
var utils$f = requireUtils();
function makeTable() {
  var c, table = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
}
var crcTable = makeTable();
function crc32$2(crc, buf, len, pos) {
  var t = crcTable, end = pos + len;
  crc = crc ^ -1;
  for (var i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
}
function crc32str(crc, str, len, pos) {
  var t = crcTable, end = pos + len;
  crc = crc ^ -1;
  for (var i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
  }
  return crc ^ -1;
}
var crc32_1 = function crc32wrapper(input, crc) {
  if (typeof input === "undefined" || !input.length) {
    return 0;
  }
  var isArray = utils$f.getTypeOf(input) !== "string";
  if (isArray) {
    return crc32$2(crc | 0, input, input.length, 0);
  } else {
    return crc32str(crc | 0, input, input.length, 0);
  }
};
var GenericWorker$7 = GenericWorker_1;
var crc32$1 = crc32_1;
var utils$e = requireUtils();
function Crc32Probe$2() {
  GenericWorker$7.call(this, "Crc32Probe");
  this.withStreamInfo("crc32", 0);
}
utils$e.inherits(Crc32Probe$2, GenericWorker$7);
Crc32Probe$2.prototype.processChunk = function(chunk) {
  this.streamInfo.crc32 = crc32$1(chunk.data, this.streamInfo.crc32 || 0);
  this.push(chunk);
};
var Crc32Probe_1 = Crc32Probe$2;
var utils$d = requireUtils();
var GenericWorker$6 = GenericWorker_1;
function DataLengthProbe$1(propName) {
  GenericWorker$6.call(this, "DataLengthProbe for " + propName);
  this.propName = propName;
  this.withStreamInfo(propName, 0);
}
utils$d.inherits(DataLengthProbe$1, GenericWorker$6);
DataLengthProbe$1.prototype.processChunk = function(chunk) {
  if (chunk) {
    var length = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = length + chunk.data.length;
  }
  GenericWorker$6.prototype.processChunk.call(this, chunk);
};
var DataLengthProbe_1 = DataLengthProbe$1;
var external$1 = external$3;
var DataWorker$1 = DataWorker_1;
var Crc32Probe$1 = Crc32Probe_1;
var DataLengthProbe = DataLengthProbe_1;
function CompressedObject$3(compressedSize, uncompressedSize, crc322, compression, data) {
  this.compressedSize = compressedSize;
  this.uncompressedSize = uncompressedSize;
  this.crc32 = crc322;
  this.compression = compression;
  this.compressedContent = data;
}
CompressedObject$3.prototype = {
  /**
   * Create a worker to get the uncompressed content.
   * @return {GenericWorker} the worker.
   */
  getContentWorker: function() {
    var worker = new DataWorker$1(external$1.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
    var that = this;
    worker.on("end", function() {
      if (this.streamInfo["data_length"] !== that.uncompressedSize) {
        throw new Error("Bug : uncompressed data size mismatch");
      }
    });
    return worker;
  },
  /**
   * Create a worker to get the compressed content.
   * @return {GenericWorker} the worker.
   */
  getCompressedWorker: function() {
    return new DataWorker$1(external$1.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
CompressedObject$3.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
  return uncompressedWorker.pipe(new Crc32Probe$1()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
};
var compressedObject = CompressedObject$3;
var StreamHelper$1 = StreamHelper_1;
var DataWorker = DataWorker_1;
var utf8$4 = utf8$5;
var CompressedObject$2 = compressedObject;
var GenericWorker$5 = GenericWorker_1;
var ZipObject$1 = function(name, data, options) {
  this.name = name;
  this.dir = options.dir;
  this.date = options.date;
  this.comment = options.comment;
  this.unixPermissions = options.unixPermissions;
  this.dosPermissions = options.dosPermissions;
  this._data = data;
  this._dataBinary = options.binary;
  this.options = {
    compression: options.compression,
    compressionOptions: options.compressionOptions
  };
};
ZipObject$1.prototype = {
  /**
   * Create an internal stream for the content of this object.
   * @param {String} type the type of each chunk.
   * @return StreamHelper the stream.
   */
  internalStream: function(type) {
    var result = null, outputType = "string";
    try {
      if (!type) {
        throw new Error("No output type specified.");
      }
      outputType = type.toLowerCase();
      var askUnicodeString = outputType === "string" || outputType === "text";
      if (outputType === "binarystring" || outputType === "text") {
        outputType = "string";
      }
      result = this._decompressWorker();
      var isUnicodeString = !this._dataBinary;
      if (isUnicodeString && !askUnicodeString) {
        result = result.pipe(new utf8$4.Utf8EncodeWorker());
      }
      if (!isUnicodeString && askUnicodeString) {
        result = result.pipe(new utf8$4.Utf8DecodeWorker());
      }
    } catch (e) {
      result = new GenericWorker$5("error");
      result.error(e);
    }
    return new StreamHelper$1(result, outputType, "");
  },
  /**
   * Prepare the content in the asked type.
   * @param {String} type the type of the result.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Promise the promise of the result.
   */
  async: function(type, onUpdate) {
    return this.internalStream(type).accumulate(onUpdate);
  },
  /**
   * Prepare the content as a nodejs stream.
   * @param {String} type the type of each chunk.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Stream the stream.
   */
  nodeStream: function(type, onUpdate) {
    return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
  },
  /**
   * Return a worker for the compressed content.
   * @private
   * @param {Object} compression the compression object to use.
   * @param {Object} compressionOptions the options to use when compressing.
   * @return Worker the worker.
   */
  _compressWorker: function(compression, compressionOptions) {
    if (this._data instanceof CompressedObject$2 && this._data.compression.magic === compression.magic) {
      return this._data.getCompressedWorker();
    } else {
      var result = this._decompressWorker();
      if (!this._dataBinary) {
        result = result.pipe(new utf8$4.Utf8EncodeWorker());
      }
      return CompressedObject$2.createWorkerFrom(result, compression, compressionOptions);
    }
  },
  /**
   * Return a worker for the decompressed content.
   * @private
   * @return Worker the worker.
   */
  _decompressWorker: function() {
    if (this._data instanceof CompressedObject$2) {
      return this._data.getContentWorker();
    } else if (this._data instanceof GenericWorker$5) {
      return this._data;
    } else {
      return new DataWorker(this._data);
    }
  }
};
var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
for (var i = 0; i < removedMethods.length; i++) {
  ZipObject$1.prototype[removedMethods[i]] = removedFn;
}
var zipObject = ZipObject$1;
var generate$1 = {};
var compressions$2 = {};
var flate = {};
var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
var pako = pako$1;
var utils$c = requireUtils();
var GenericWorker$4 = GenericWorker_1;
var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
flate.magic = "\b\0";
function FlateWorker(action, options) {
  GenericWorker$4.call(this, "FlateWorker/" + action);
  this._pako = null;
  this._pakoAction = action;
  this._pakoOptions = options;
  this.meta = {};
}
utils$c.inherits(FlateWorker, GenericWorker$4);
FlateWorker.prototype.processChunk = function(chunk) {
  this.meta = chunk.meta;
  if (this._pako === null) {
    this._createPako();
  }
  this._pako.push(utils$c.transformTo(ARRAY_TYPE, chunk.data), false);
};
FlateWorker.prototype.flush = function() {
  GenericWorker$4.prototype.flush.call(this);
  if (this._pako === null) {
    this._createPako();
  }
  this._pako.push([], true);
};
FlateWorker.prototype.cleanUp = function() {
  GenericWorker$4.prototype.cleanUp.call(this);
  this._pako = null;
};
FlateWorker.prototype._createPako = function() {
  this._pako = new pako[this._pakoAction]({
    raw: true,
    level: this._pakoOptions.level || -1
    // default compression
  });
  var self2 = this;
  this._pako.onData = function(data) {
    self2.push({
      data,
      meta: self2.meta
    });
  };
};
flate.compressWorker = function(compressionOptions) {
  return new FlateWorker("Deflate", compressionOptions);
};
flate.uncompressWorker = function() {
  return new FlateWorker("Inflate", {});
};
var GenericWorker$3 = GenericWorker_1;
compressions$2.STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new GenericWorker$3("STORE compression");
  },
  uncompressWorker: function() {
    return new GenericWorker$3("STORE decompression");
  }
};
compressions$2.DEFLATE = flate;
var signature$1 = {};
signature$1.LOCAL_FILE_HEADER = "PK";
signature$1.CENTRAL_FILE_HEADER = "PK";
signature$1.CENTRAL_DIRECTORY_END = "PK";
signature$1.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
signature$1.ZIP64_CENTRAL_DIRECTORY_END = "PK";
signature$1.DATA_DESCRIPTOR = "PK\x07\b";
var utils$b = requireUtils();
var GenericWorker$2 = GenericWorker_1;
var utf8$3 = utf8$5;
var crc32 = crc32_1;
var signature = signature$1;
var decToHex = function(dec, bytes) {
  var hex = "", i;
  for (i = 0; i < bytes; i++) {
    hex += String.fromCharCode(dec & 255);
    dec = dec >>> 8;
  }
  return hex;
};
var generateUnixExternalFileAttr = function(unixPermissions, isDir) {
  var result = unixPermissions;
  if (!unixPermissions) {
    result = isDir ? 16893 : 33204;
  }
  return (result & 65535) << 16;
};
var generateDosExternalFileAttr = function(dosPermissions) {
  return (dosPermissions || 0) & 63;
};
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
  var file = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8$3.utf8encode, encodedFileName = utils$b.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils$b.transformTo("string", utf8$3.utf8encode(file.name)), comment = file.comment, encodedComment = utils$b.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils$b.transformTo("string", utf8$3.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir = file.dir, date = file.date;
  var dataInfo = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  if (!streamedContent || streamingEnded) {
    dataInfo.crc32 = streamInfo["crc32"];
    dataInfo.compressedSize = streamInfo["compressedSize"];
    dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
  }
  var bitflag = 0;
  if (streamedContent) {
    bitflag |= 8;
  }
  if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
    bitflag |= 2048;
  }
  var extFileAttr = 0;
  var versionMadeBy = 0;
  if (dir) {
    extFileAttr |= 16;
  }
  if (platform === "UNIX") {
    versionMadeBy = 798;
    extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
  } else {
    versionMadeBy = 20;
    extFileAttr |= generateDosExternalFileAttr(file.dosPermissions);
  }
  dosTime = date.getUTCHours();
  dosTime = dosTime << 6;
  dosTime = dosTime | date.getUTCMinutes();
  dosTime = dosTime << 5;
  dosTime = dosTime | date.getUTCSeconds() / 2;
  dosDate = date.getUTCFullYear() - 1980;
  dosDate = dosDate << 4;
  dosDate = dosDate | date.getUTCMonth() + 1;
  dosDate = dosDate << 5;
  dosDate = dosDate | date.getUTCDate();
  if (useUTF8ForFileName) {
    unicodePathExtraField = // Version
    decToHex(1, 1) + // NameCRC32
    decToHex(crc32(encodedFileName), 4) + // UnicodeName
    utfEncodedFileName;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "up" + // size
    decToHex(unicodePathExtraField.length, 2) + // content
    unicodePathExtraField;
  }
  if (useUTF8ForComment) {
    unicodeCommentExtraField = // Version
    decToHex(1, 1) + // CommentCRC32
    decToHex(crc32(encodedComment), 4) + // UnicodeName
    utfEncodedComment;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "uc" + // size
    decToHex(unicodeCommentExtraField.length, 2) + // content
    unicodeCommentExtraField;
  }
  var header = "";
  header += "\n\0";
  header += decToHex(bitflag, 2);
  header += compression.magic;
  header += decToHex(dosTime, 2);
  header += decToHex(dosDate, 2);
  header += decToHex(dataInfo.crc32, 4);
  header += decToHex(dataInfo.compressedSize, 4);
  header += decToHex(dataInfo.uncompressedSize, 4);
  header += decToHex(encodedFileName.length, 2);
  header += decToHex(extraFields.length, 2);
  var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
  var dirRecord = signature.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  decToHex(versionMadeBy, 2) + // file header (common to file and central directory)
  header + // file comment length
  decToHex(encodedComment.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  decToHex(extFileAttr, 4) + // relative offset of local header
  decToHex(offset, 4) + // file name
  encodedFileName + // extra field
  extraFields + // file comment
  encodedComment;
  return {
    fileRecord,
    dirRecord
  };
};
var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
  var dirEnd = "";
  var encodedComment = utils$b.transformTo("string", encodeFileName(comment));
  dirEnd = signature.CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  decToHex(entriesCount, 2) + // total number of entries in the central directory
  decToHex(entriesCount, 2) + // size of the central directory   4 bytes
  decToHex(centralDirLength, 4) + // offset of start of central directory with respect to the starting disk number
  decToHex(localDirLength, 4) + // .ZIP file comment length
  decToHex(encodedComment.length, 2) + // .ZIP file comment
  encodedComment;
  return dirEnd;
};
var generateDataDescriptors = function(streamInfo) {
  var descriptor = "";
  descriptor = signature.DATA_DESCRIPTOR + // crc-32                          4 bytes
  decToHex(streamInfo["crc32"], 4) + // compressed size                 4 bytes
  decToHex(streamInfo["compressedSize"], 4) + // uncompressed size               4 bytes
  decToHex(streamInfo["uncompressedSize"], 4);
  return descriptor;
};
function ZipFileWorker$1(streamFiles, comment, platform, encodeFileName) {
  GenericWorker$2.call(this, "ZipFileWorker");
  this.bytesWritten = 0;
  this.zipComment = comment;
  this.zipPlatform = platform;
  this.encodeFileName = encodeFileName;
  this.streamFiles = streamFiles;
  this.accumulate = false;
  this.contentBuffer = [];
  this.dirRecords = [];
  this.currentSourceOffset = 0;
  this.entriesCount = 0;
  this.currentFile = null;
  this._sources = [];
}
utils$b.inherits(ZipFileWorker$1, GenericWorker$2);
ZipFileWorker$1.prototype.push = function(chunk) {
  var currentFilePercent = chunk.meta.percent || 0;
  var entriesCount = this.entriesCount;
  var remainingFiles = this._sources.length;
  if (this.accumulate) {
    this.contentBuffer.push(chunk);
  } else {
    this.bytesWritten += chunk.data.length;
    GenericWorker$2.prototype.push.call(this, {
      data: chunk.data,
      meta: {
        currentFile: this.currentFile,
        percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
      }
    });
  }
};
ZipFileWorker$1.prototype.openedSource = function(streamInfo) {
  this.currentSourceOffset = this.bytesWritten;
  this.currentFile = streamInfo["file"].name;
  var streamedContent = this.streamFiles && !streamInfo["file"].dir;
  if (streamedContent) {
    var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.push({
      data: record.fileRecord,
      meta: { percent: 0 }
    });
  } else {
    this.accumulate = true;
  }
};
ZipFileWorker$1.prototype.closedSource = function(streamInfo) {
  this.accumulate = false;
  var streamedContent = this.streamFiles && !streamInfo["file"].dir;
  var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  this.dirRecords.push(record.dirRecord);
  if (streamedContent) {
    this.push({
      data: generateDataDescriptors(streamInfo),
      meta: { percent: 100 }
    });
  } else {
    this.push({
      data: record.fileRecord,
      meta: { percent: 0 }
    });
    while (this.contentBuffer.length) {
      this.push(this.contentBuffer.shift());
    }
  }
  this.currentFile = null;
};
ZipFileWorker$1.prototype.flush = function() {
  var localDirLength = this.bytesWritten;
  for (var i = 0; i < this.dirRecords.length; i++) {
    this.push({
      data: this.dirRecords[i],
      meta: { percent: 100 }
    });
  }
  var centralDirLength = this.bytesWritten - localDirLength;
  var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
  this.push({
    data: dirEnd,
    meta: { percent: 100 }
  });
};
ZipFileWorker$1.prototype.prepareNextSource = function() {
  this.previous = this._sources.shift();
  this.openedSource(this.previous.streamInfo);
  if (this.isPaused) {
    this.previous.pause();
  } else {
    this.previous.resume();
  }
};
ZipFileWorker$1.prototype.registerPrevious = function(previous) {
  this._sources.push(previous);
  var self2 = this;
  previous.on("data", function(chunk) {
    self2.processChunk(chunk);
  });
  previous.on("end", function() {
    self2.closedSource(self2.previous.streamInfo);
    if (self2._sources.length) {
      self2.prepareNextSource();
    } else {
      self2.end();
    }
  });
  previous.on("error", function(e) {
    self2.error(e);
  });
  return this;
};
ZipFileWorker$1.prototype.resume = function() {
  if (!GenericWorker$2.prototype.resume.call(this)) {
    return false;
  }
  if (!this.previous && this._sources.length) {
    this.prepareNextSource();
    return true;
  }
  if (!this.previous && !this._sources.length && !this.generatedError) {
    this.end();
    return true;
  }
};
ZipFileWorker$1.prototype.error = function(e) {
  var sources = this._sources;
  if (!GenericWorker$2.prototype.error.call(this, e)) {
    return false;
  }
  for (var i = 0; i < sources.length; i++) {
    try {
      sources[i].error(e);
    } catch (e2) {
    }
  }
  return true;
};
ZipFileWorker$1.prototype.lock = function() {
  GenericWorker$2.prototype.lock.call(this);
  var sources = this._sources;
  for (var i = 0; i < sources.length; i++) {
    sources[i].lock();
  }
};
var ZipFileWorker_1 = ZipFileWorker$1;
var compressions$1 = compressions$2;
var ZipFileWorker = ZipFileWorker_1;
var getCompression = function(fileCompression, zipCompression) {
  var compressionName = fileCompression || zipCompression;
  var compression = compressions$1[compressionName];
  if (!compression) {
    throw new Error(compressionName + " is not a valid compression method !");
  }
  return compression;
};
generate$1.generateWorker = function(zip, options, comment) {
  var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
  var entriesCount = 0;
  try {
    zip.forEach(function(relativePath, file) {
      entriesCount++;
      var compression = getCompression(file.options.compression, options.compression);
      var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
      var dir = file.dir, date = file.date;
      file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
        name: relativePath,
        dir,
        date,
        comment: file.comment || "",
        unixPermissions: file.unixPermissions,
        dosPermissions: file.dosPermissions
      }).pipe(zipFileWorker);
    });
    zipFileWorker.entriesCount = entriesCount;
  } catch (e) {
    zipFileWorker.error(e);
  }
  return zipFileWorker;
};
var utils$a = requireUtils();
var GenericWorker$1 = GenericWorker_1;
function NodejsStreamInputAdapter$1(filename, stream2) {
  GenericWorker$1.call(this, "Nodejs stream input adapter for " + filename);
  this._upstreamEnded = false;
  this._bindStream(stream2);
}
utils$a.inherits(NodejsStreamInputAdapter$1, GenericWorker$1);
NodejsStreamInputAdapter$1.prototype._bindStream = function(stream2) {
  var self2 = this;
  this._stream = stream2;
  stream2.pause();
  stream2.on("data", function(chunk) {
    self2.push({
      data: chunk,
      meta: {
        percent: 0
      }
    });
  }).on("error", function(e) {
    if (self2.isPaused) {
      this.generatedError = e;
    } else {
      self2.error(e);
    }
  }).on("end", function() {
    if (self2.isPaused) {
      self2._upstreamEnded = true;
    } else {
      self2.end();
    }
  });
};
NodejsStreamInputAdapter$1.prototype.pause = function() {
  if (!GenericWorker$1.prototype.pause.call(this)) {
    return false;
  }
  this._stream.pause();
  return true;
};
NodejsStreamInputAdapter$1.prototype.resume = function() {
  if (!GenericWorker$1.prototype.resume.call(this)) {
    return false;
  }
  if (this._upstreamEnded) {
    this.end();
  } else {
    this._stream.resume();
  }
  return true;
};
var NodejsStreamInputAdapter_1 = NodejsStreamInputAdapter$1;
var utf8$2 = utf8$5;
var utils$9 = requireUtils();
var GenericWorker = GenericWorker_1;
var StreamHelper = StreamHelper_1;
var defaults = defaults$1;
var CompressedObject$1 = compressedObject;
var ZipObject = zipObject;
var generate = generate$1;
var nodejsUtils$1 = nodejsUtils$2;
var NodejsStreamInputAdapter = NodejsStreamInputAdapter_1;
var fileAdd = function(name, data, originalOptions) {
  var dataType = utils$9.getTypeOf(data), parent;
  var o = utils$9.extend(originalOptions || {}, defaults);
  o.date = o.date || /* @__PURE__ */ new Date();
  if (o.compression !== null) {
    o.compression = o.compression.toUpperCase();
  }
  if (typeof o.unixPermissions === "string") {
    o.unixPermissions = parseInt(o.unixPermissions, 8);
  }
  if (o.unixPermissions && o.unixPermissions & 16384) {
    o.dir = true;
  }
  if (o.dosPermissions && o.dosPermissions & 16) {
    o.dir = true;
  }
  if (o.dir) {
    name = forceTrailingSlash(name);
  }
  if (o.createFolders && (parent = parentFolder(name))) {
    folderAdd.call(this, parent, true);
  }
  var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
  if (!originalOptions || typeof originalOptions.binary === "undefined") {
    o.binary = !isUnicodeString;
  }
  var isCompressedEmpty = data instanceof CompressedObject$1 && data.uncompressedSize === 0;
  if (isCompressedEmpty || o.dir || !data || data.length === 0) {
    o.base64 = false;
    o.binary = true;
    data = "";
    o.compression = "STORE";
    dataType = "string";
  }
  var zipObjectContent = null;
  if (data instanceof CompressedObject$1 || data instanceof GenericWorker) {
    zipObjectContent = data;
  } else if (nodejsUtils$1.isNode && nodejsUtils$1.isStream(data)) {
    zipObjectContent = new NodejsStreamInputAdapter(name, data);
  } else {
    zipObjectContent = utils$9.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
  }
  var object2 = new ZipObject(name, zipObjectContent, o);
  this.files[name] = object2;
};
var parentFolder = function(path) {
  if (path.slice(-1) === "/") {
    path = path.substring(0, path.length - 1);
  }
  var lastSlash = path.lastIndexOf("/");
  return lastSlash > 0 ? path.substring(0, lastSlash) : "";
};
var forceTrailingSlash = function(path) {
  if (path.slice(-1) !== "/") {
    path += "/";
  }
  return path;
};
var folderAdd = function(name, createFolders) {
  createFolders = typeof createFolders !== "undefined" ? createFolders : defaults.createFolders;
  name = forceTrailingSlash(name);
  if (!this.files[name]) {
    fileAdd.call(this, name, null, {
      dir: true,
      createFolders
    });
  }
  return this.files[name];
};
function isRegExp(object2) {
  return Object.prototype.toString.call(object2) === "[object RegExp]";
}
var out = {
  /**
   * @see loadAsync
   */
  load: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Call a callback function for each entry at this folder level.
   * @param {Function} cb the callback function:
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   */
  forEach: function(cb) {
    var filename, relativePath, file;
    for (filename in this.files) {
      file = this.files[filename];
      relativePath = filename.slice(this.root.length, filename.length);
      if (relativePath && filename.slice(0, this.root.length) === this.root) {
        cb(relativePath, file);
      }
    }
  },
  /**
   * Filter nested files/folders with the specified function.
   * @param {Function} search the predicate to use :
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   * @return {Array} An array of matching elements.
   */
  filter: function(search) {
    var result = [];
    this.forEach(function(relativePath, entry) {
      if (search(relativePath, entry)) {
        result.push(entry);
      }
    });
    return result;
  },
  /**
   * Add a file to the zip file, or search a file.
   * @param   {string|RegExp} name The name of the file to add (if data is defined),
   * the name of the file to find (if no data) or a regex to match files.
   * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
   * @param   {Object} o     File options
   * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
   * a file (when searching by string) or an array of files (when searching by regex).
   */
  file: function(name, data, o) {
    if (arguments.length === 1) {
      if (isRegExp(name)) {
        var regexp = name;
        return this.filter(function(relativePath, file) {
          return !file.dir && regexp.test(relativePath);
        });
      } else {
        var obj = this.files[this.root + name];
        if (obj && !obj.dir) {
          return obj;
        } else {
          return null;
        }
      }
    } else {
      name = this.root + name;
      fileAdd.call(this, name, data, o);
    }
    return this;
  },
  /**
   * Add a directory to the zip file, or search.
   * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
   * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
   */
  folder: function(arg) {
    if (!arg) {
      return this;
    }
    if (isRegExp(arg)) {
      return this.filter(function(relativePath, file) {
        return file.dir && arg.test(relativePath);
      });
    }
    var name = this.root + arg;
    var newFolder = folderAdd.call(this, name);
    var ret = this.clone();
    ret.root = newFolder.name;
    return ret;
  },
  /**
   * Delete a file, or a directory and all sub-files, from the zip
   * @param {string} name the name of the file to delete
   * @return {JSZip} this JSZip object
   */
  remove: function(name) {
    name = this.root + name;
    var file = this.files[name];
    if (!file) {
      if (name.slice(-1) !== "/") {
        name += "/";
      }
      file = this.files[name];
    }
    if (file && !file.dir) {
      delete this.files[name];
    } else {
      var kids = this.filter(function(relativePath, file2) {
        return file2.name.slice(0, name.length) === name;
      });
      for (var i = 0; i < kids.length; i++) {
        delete this.files[kids[i].name];
      }
    }
    return this;
  },
  /**
   * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
   */
  generate: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Generate the complete zip file as an internal stream.
   * @param {Object} options the options to generate the zip file :
   * - compression, "STORE" by default.
   * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
   * @return {StreamHelper} the streamed zip file.
   */
  generateInternalStream: function(options) {
    var worker, opts = {};
    try {
      opts = utils$9.extend(options || {}, {
        streamFiles: false,
        compression: "STORE",
        compressionOptions: null,
        type: "",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: utf8$2.utf8encode
      });
      opts.type = opts.type.toLowerCase();
      opts.compression = opts.compression.toUpperCase();
      if (opts.type === "binarystring") {
        opts.type = "string";
      }
      if (!opts.type) {
        throw new Error("No output type specified.");
      }
      utils$9.checkSupport(opts.type);
      if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") {
        opts.platform = "UNIX";
      }
      if (opts.platform === "win32") {
        opts.platform = "DOS";
      }
      var comment = opts.comment || this.comment || "";
      worker = generate.generateWorker(this, opts, comment);
    } catch (e) {
      worker = new GenericWorker("error");
      worker.error(e);
    }
    return new StreamHelper(worker, opts.type || "string", opts.mimeType);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateAsync: function(options, onUpdate) {
    return this.generateInternalStream(options).accumulate(onUpdate);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateNodeStream: function(options, onUpdate) {
    options = options || {};
    if (!options.type) {
      options.type = "nodebuffer";
    }
    return this.generateInternalStream(options).toNodejsStream(onUpdate);
  }
};
var object = out;
var utils$8 = requireUtils();
function DataReader$2(data) {
  this.data = data;
  this.length = data.length;
  this.index = 0;
  this.zero = 0;
}
DataReader$2.prototype = {
  /**
   * Check that the offset will not go too far.
   * @param {string} offset the additional offset to check.
   * @throws {Error} an Error if the offset is out of bounds.
   */
  checkOffset: function(offset) {
    this.checkIndex(this.index + offset);
  },
  /**
   * Check that the specified index will not be too far.
   * @param {string} newIndex the index to check.
   * @throws {Error} an Error if the index is out of bounds.
   */
  checkIndex: function(newIndex) {
    if (this.length < this.zero + newIndex || newIndex < 0) {
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
    }
  },
  /**
   * Change the index.
   * @param {number} newIndex The new index.
   * @throws {Error} if the new index is out of the data.
   */
  setIndex: function(newIndex) {
    this.checkIndex(newIndex);
    this.index = newIndex;
  },
  /**
   * Skip the next n bytes.
   * @param {number} n the number of bytes to skip.
   * @throws {Error} if the new index is out of the data.
   */
  skip: function(n) {
    this.setIndex(this.index + n);
  },
  /**
   * Get the byte at the specified index.
   * @param {number} i the index to use.
   * @return {number} a byte.
   */
  byteAt: function() {
  },
  /**
   * Get the next number with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {number} the corresponding number.
   */
  readInt: function(size) {
    var result = 0, i;
    this.checkOffset(size);
    for (i = this.index + size - 1; i >= this.index; i--) {
      result = (result << 8) + this.byteAt(i);
    }
    this.index += size;
    return result;
  },
  /**
   * Get the next string with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {string} the corresponding string.
   */
  readString: function(size) {
    return utils$8.transformTo("string", this.readData(size));
  },
  /**
   * Get raw data without conversion, <size> bytes.
   * @param {number} size the number of bytes to read.
   * @return {Object} the raw data, implementation specific.
   */
  readData: function() {
  },
  /**
   * Find the last occurrence of a zip signature (4 bytes).
   * @param {string} sig the signature to find.
   * @return {number} the index of the last occurrence, -1 if not found.
   */
  lastIndexOfSignature: function() {
  },
  /**
   * Read the signature (4 bytes) at the current position and compare it with sig.
   * @param {string} sig the expected signature
   * @return {boolean} true if the signature matches, false otherwise.
   */
  readAndCheckSignature: function() {
  },
  /**
   * Get the next date.
   * @return {Date} the date.
   */
  readDate: function() {
    var dostime = this.readInt(4);
    return new Date(Date.UTC(
      (dostime >> 25 & 127) + 1980,
      // year
      (dostime >> 21 & 15) - 1,
      // month
      dostime >> 16 & 31,
      // day
      dostime >> 11 & 31,
      // hour
      dostime >> 5 & 63,
      // minute
      (dostime & 31) << 1
    ));
  }
};
var DataReader_1 = DataReader$2;
var DataReader$1 = DataReader_1;
var utils$7 = requireUtils();
function ArrayReader$2(data) {
  DataReader$1.call(this, data);
  for (var i = 0; i < this.data.length; i++) {
    data[i] = data[i] & 255;
  }
}
utils$7.inherits(ArrayReader$2, DataReader$1);
ArrayReader$2.prototype.byteAt = function(i) {
  return this.data[this.zero + i];
};
ArrayReader$2.prototype.lastIndexOfSignature = function(sig2) {
  var sig0 = sig2.charCodeAt(0), sig1 = sig2.charCodeAt(1), sig22 = sig2.charCodeAt(2), sig3 = sig2.charCodeAt(3);
  for (var i = this.length - 4; i >= 0; --i) {
    if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig22 && this.data[i + 3] === sig3) {
      return i - this.zero;
    }
  }
  return -1;
};
ArrayReader$2.prototype.readAndCheckSignature = function(sig2) {
  var sig0 = sig2.charCodeAt(0), sig1 = sig2.charCodeAt(1), sig22 = sig2.charCodeAt(2), sig3 = sig2.charCodeAt(3), data = this.readData(4);
  return sig0 === data[0] && sig1 === data[1] && sig22 === data[2] && sig3 === data[3];
};
ArrayReader$2.prototype.readData = function(size) {
  this.checkOffset(size);
  if (size === 0) {
    return [];
  }
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var ArrayReader_1 = ArrayReader$2;
var DataReader = DataReader_1;
var utils$6 = requireUtils();
function StringReader$1(data) {
  DataReader.call(this, data);
}
utils$6.inherits(StringReader$1, DataReader);
StringReader$1.prototype.byteAt = function(i) {
  return this.data.charCodeAt(this.zero + i);
};
StringReader$1.prototype.lastIndexOfSignature = function(sig2) {
  return this.data.lastIndexOf(sig2) - this.zero;
};
StringReader$1.prototype.readAndCheckSignature = function(sig2) {
  var data = this.readData(4);
  return sig2 === data;
};
StringReader$1.prototype.readData = function(size) {
  this.checkOffset(size);
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var StringReader_1 = StringReader$1;
var ArrayReader$1 = ArrayReader_1;
var utils$5 = requireUtils();
function Uint8ArrayReader$2(data) {
  ArrayReader$1.call(this, data);
}
utils$5.inherits(Uint8ArrayReader$2, ArrayReader$1);
Uint8ArrayReader$2.prototype.readData = function(size) {
  this.checkOffset(size);
  if (size === 0) {
    return new Uint8Array(0);
  }
  var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var Uint8ArrayReader_1 = Uint8ArrayReader$2;
var Uint8ArrayReader$1 = Uint8ArrayReader_1;
var utils$4 = requireUtils();
function NodeBufferReader$1(data) {
  Uint8ArrayReader$1.call(this, data);
}
utils$4.inherits(NodeBufferReader$1, Uint8ArrayReader$1);
NodeBufferReader$1.prototype.readData = function(size) {
  this.checkOffset(size);
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var NodeBufferReader_1 = NodeBufferReader$1;
var utils$3 = requireUtils();
var support$2 = support$4;
var ArrayReader = ArrayReader_1;
var StringReader = StringReader_1;
var NodeBufferReader = NodeBufferReader_1;
var Uint8ArrayReader = Uint8ArrayReader_1;
var readerFor$2 = function(data) {
  var type = utils$3.getTypeOf(data);
  utils$3.checkSupport(type);
  if (type === "string" && !support$2.uint8array) {
    return new StringReader(data);
  }
  if (type === "nodebuffer") {
    return new NodeBufferReader(data);
  }
  if (support$2.uint8array) {
    return new Uint8ArrayReader(utils$3.transformTo("uint8array", data));
  }
  return new ArrayReader(utils$3.transformTo("array", data));
};
var readerFor$1 = readerFor$2;
var utils$2 = requireUtils();
var CompressedObject = compressedObject;
var crc32fn = crc32_1;
var utf8$1 = utf8$5;
var compressions = compressions$2;
var support$1 = support$4;
var MADE_BY_DOS = 0;
var MADE_BY_UNIX = 3;
var findCompression = function(compressionMethod) {
  for (var method in compressions) {
    if (!Object.prototype.hasOwnProperty.call(compressions, method)) {
      continue;
    }
    if (compressions[method].magic === compressionMethod) {
      return compressions[method];
    }
  }
  return null;
};
function ZipEntry$1(options, loadOptions) {
  this.options = options;
  this.loadOptions = loadOptions;
}
ZipEntry$1.prototype = {
  /**
   * say if the file is encrypted.
   * @return {boolean} true if the file is encrypted, false otherwise.
   */
  isEncrypted: function() {
    return (this.bitFlag & 1) === 1;
  },
  /**
   * say if the file has utf-8 filename/comment.
   * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
   */
  useUTF8: function() {
    return (this.bitFlag & 2048) === 2048;
  },
  /**
   * Read the local part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readLocalPart: function(reader) {
    var compression, localExtraFieldsLength;
    reader.skip(22);
    this.fileNameLength = reader.readInt(2);
    localExtraFieldsLength = reader.readInt(2);
    this.fileName = reader.readData(this.fileNameLength);
    reader.skip(localExtraFieldsLength);
    if (this.compressedSize === -1 || this.uncompressedSize === -1) {
      throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
    }
    compression = findCompression(this.compressionMethod);
    if (compression === null) {
      throw new Error("Corrupted zip : compression " + utils$2.pretty(this.compressionMethod) + " unknown (inner file : " + utils$2.transformTo("string", this.fileName) + ")");
    }
    this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readCentralPart: function(reader) {
    this.versionMadeBy = reader.readInt(2);
    reader.skip(2);
    this.bitFlag = reader.readInt(2);
    this.compressionMethod = reader.readString(2);
    this.date = reader.readDate();
    this.crc32 = reader.readInt(4);
    this.compressedSize = reader.readInt(4);
    this.uncompressedSize = reader.readInt(4);
    var fileNameLength = reader.readInt(2);
    this.extraFieldsLength = reader.readInt(2);
    this.fileCommentLength = reader.readInt(2);
    this.diskNumberStart = reader.readInt(2);
    this.internalFileAttributes = reader.readInt(2);
    this.externalFileAttributes = reader.readInt(4);
    this.localHeaderOffset = reader.readInt(4);
    if (this.isEncrypted()) {
      throw new Error("Encrypted zip are not supported");
    }
    reader.skip(fileNameLength);
    this.readExtraFields(reader);
    this.parseZIP64ExtraField(reader);
    this.fileComment = reader.readData(this.fileCommentLength);
  },
  /**
   * Parse the external file attributes and get the unix/dos permissions.
   */
  processAttributes: function() {
    this.unixPermissions = null;
    this.dosPermissions = null;
    var madeBy = this.versionMadeBy >> 8;
    this.dir = this.externalFileAttributes & 16 ? true : false;
    if (madeBy === MADE_BY_DOS) {
      this.dosPermissions = this.externalFileAttributes & 63;
    }
    if (madeBy === MADE_BY_UNIX) {
      this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
    }
    if (!this.dir && this.fileNameStr.slice(-1) === "/") {
      this.dir = true;
    }
  },
  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   * @param {DataReader} reader the reader to use.
   */
  parseZIP64ExtraField: function() {
    if (!this.extraFields[1]) {
      return;
    }
    var extraReader = readerFor$1(this.extraFields[1].value);
    if (this.uncompressedSize === utils$2.MAX_VALUE_32BITS) {
      this.uncompressedSize = extraReader.readInt(8);
    }
    if (this.compressedSize === utils$2.MAX_VALUE_32BITS) {
      this.compressedSize = extraReader.readInt(8);
    }
    if (this.localHeaderOffset === utils$2.MAX_VALUE_32BITS) {
      this.localHeaderOffset = extraReader.readInt(8);
    }
    if (this.diskNumberStart === utils$2.MAX_VALUE_32BITS) {
      this.diskNumberStart = extraReader.readInt(4);
    }
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readExtraFields: function(reader) {
    var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
    if (!this.extraFields) {
      this.extraFields = {};
    }
    while (reader.index + 4 < end) {
      extraFieldId = reader.readInt(2);
      extraFieldLength = reader.readInt(2);
      extraFieldValue = reader.readData(extraFieldLength);
      this.extraFields[extraFieldId] = {
        id: extraFieldId,
        length: extraFieldLength,
        value: extraFieldValue
      };
    }
    reader.setIndex(end);
  },
  /**
   * Apply an UTF8 transformation if needed.
   */
  handleUTF8: function() {
    var decodeParamType = support$1.uint8array ? "uint8array" : "array";
    if (this.useUTF8()) {
      this.fileNameStr = utf8$1.utf8decode(this.fileName);
      this.fileCommentStr = utf8$1.utf8decode(this.fileComment);
    } else {
      var upath = this.findExtraFieldUnicodePath();
      if (upath !== null) {
        this.fileNameStr = upath;
      } else {
        var fileNameByteArray = utils$2.transformTo(decodeParamType, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
      }
      var ucomment = this.findExtraFieldUnicodeComment();
      if (ucomment !== null) {
        this.fileCommentStr = ucomment;
      } else {
        var commentByteArray = utils$2.transformTo(decodeParamType, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
      }
    }
  },
  /**
   * Find the unicode path declared in the extra field, if any.
   * @return {String} the unicode path, null otherwise.
   */
  findExtraFieldUnicodePath: function() {
    var upathField = this.extraFields[28789];
    if (upathField) {
      var extraReader = readerFor$1(upathField.value);
      if (extraReader.readInt(1) !== 1) {
        return null;
      }
      if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
        return null;
      }
      return utf8$1.utf8decode(extraReader.readData(upathField.length - 5));
    }
    return null;
  },
  /**
   * Find the unicode comment declared in the extra field, if any.
   * @return {String} the unicode comment, null otherwise.
   */
  findExtraFieldUnicodeComment: function() {
    var ucommentField = this.extraFields[25461];
    if (ucommentField) {
      var extraReader = readerFor$1(ucommentField.value);
      if (extraReader.readInt(1) !== 1) {
        return null;
      }
      if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
        return null;
      }
      return utf8$1.utf8decode(extraReader.readData(ucommentField.length - 5));
    }
    return null;
  }
};
var zipEntry = ZipEntry$1;
var readerFor = readerFor$2;
var utils$1 = requireUtils();
var sig = signature$1;
var ZipEntry = zipEntry;
var support = support$4;
function ZipEntries$1(loadOptions) {
  this.files = [];
  this.loadOptions = loadOptions;
}
ZipEntries$1.prototype = {
  /**
   * Check that the reader is on the specified signature.
   * @param {string} expectedSignature the expected signature.
   * @throws {Error} if it is an other signature.
   */
  checkSignature: function(expectedSignature) {
    if (!this.reader.readAndCheckSignature(expectedSignature)) {
      this.reader.index -= 4;
      var signature2 = this.reader.readString(4);
      throw new Error("Corrupted zip or bug: unexpected signature (" + utils$1.pretty(signature2) + ", expected " + utils$1.pretty(expectedSignature) + ")");
    }
  },
  /**
   * Check if the given signature is at the given index.
   * @param {number} askedIndex the index to check.
   * @param {string} expectedSignature the signature to expect.
   * @return {boolean} true if the signature is here, false otherwise.
   */
  isSignature: function(askedIndex, expectedSignature) {
    var currentIndex = this.reader.index;
    this.reader.setIndex(askedIndex);
    var signature2 = this.reader.readString(4);
    var result = signature2 === expectedSignature;
    this.reader.setIndex(currentIndex);
    return result;
  },
  /**
   * Read the end of the central directory.
   */
  readBlockEndOfCentral: function() {
    this.diskNumber = this.reader.readInt(2);
    this.diskWithCentralDirStart = this.reader.readInt(2);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
    this.centralDirRecords = this.reader.readInt(2);
    this.centralDirSize = this.reader.readInt(4);
    this.centralDirOffset = this.reader.readInt(4);
    this.zipCommentLength = this.reader.readInt(2);
    var zipComment = this.reader.readData(this.zipCommentLength);
    var decodeParamType = support.uint8array ? "uint8array" : "array";
    var decodeContent = utils$1.transformTo(decodeParamType, zipComment);
    this.zipComment = this.loadOptions.decodeFileName(decodeContent);
  },
  /**
   * Read the end of the Zip 64 central directory.
   * Not merged with the method readEndOfCentral :
   * The end of central can coexist with its Zip64 brother,
   * I don't want to read the wrong number of bytes !
   */
  readBlockZip64EndOfCentral: function() {
    this.zip64EndOfCentralSize = this.reader.readInt(8);
    this.reader.skip(4);
    this.diskNumber = this.reader.readInt(4);
    this.diskWithCentralDirStart = this.reader.readInt(4);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
    this.centralDirRecords = this.reader.readInt(8);
    this.centralDirSize = this.reader.readInt(8);
    this.centralDirOffset = this.reader.readInt(8);
    this.zip64ExtensibleData = {};
    var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
    while (index < extraDataSize) {
      extraFieldId = this.reader.readInt(2);
      extraFieldLength = this.reader.readInt(4);
      extraFieldValue = this.reader.readData(extraFieldLength);
      this.zip64ExtensibleData[extraFieldId] = {
        id: extraFieldId,
        length: extraFieldLength,
        value: extraFieldValue
      };
    }
  },
  /**
   * Read the end of the Zip 64 central directory locator.
   */
  readBlockZip64EndOfCentralLocator: function() {
    this.diskWithZip64CentralDirStart = this.reader.readInt(4);
    this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
    this.disksCount = this.reader.readInt(4);
    if (this.disksCount > 1) {
      throw new Error("Multi-volumes zip are not supported");
    }
  },
  /**
   * Read the local files, based on the offset read in the central part.
   */
  readLocalFiles: function() {
    var i, file;
    for (i = 0; i < this.files.length; i++) {
      file = this.files[i];
      this.reader.setIndex(file.localHeaderOffset);
      this.checkSignature(sig.LOCAL_FILE_HEADER);
      file.readLocalPart(this.reader);
      file.handleUTF8();
      file.processAttributes();
    }
  },
  /**
   * Read the central directory.
   */
  readCentralDir: function() {
    var file;
    this.reader.setIndex(this.centralDirOffset);
    while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
      file = new ZipEntry({
        zip64: this.zip64
      }, this.loadOptions);
      file.readCentralPart(this.reader);
      this.files.push(file);
    }
    if (this.centralDirRecords !== this.files.length) {
      if (this.centralDirRecords !== 0 && this.files.length === 0) {
        throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }
    }
  },
  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function() {
    var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
    if (offset < 0) {
      var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
      if (isGarbage) {
        throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
      } else {
        throw new Error("Corrupted zip: can't find end of central directory");
      }
    }
    this.reader.setIndex(offset);
    var endOfCentralDirOffset = offset;
    this.checkSignature(sig.CENTRAL_DIRECTORY_END);
    this.readBlockEndOfCentral();
    if (this.diskNumber === utils$1.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils$1.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils$1.MAX_VALUE_16BITS || this.centralDirRecords === utils$1.MAX_VALUE_16BITS || this.centralDirSize === utils$1.MAX_VALUE_32BITS || this.centralDirOffset === utils$1.MAX_VALUE_32BITS) {
      this.zip64 = true;
      offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
      if (offset < 0) {
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      }
      this.reader.setIndex(offset);
      this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
      this.readBlockZip64EndOfCentralLocator();
      if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
        this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
        if (this.relativeOffsetEndOfZip64CentralDir < 0) {
          throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
        }
      }
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
      this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
      this.readBlockZip64EndOfCentral();
    }
    var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
    if (this.zip64) {
      expectedEndOfCentralDirOffset += 20;
      expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
    }
    var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
    if (extraBytes > 0) {
      if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) ;
      else {
        this.reader.zero = extraBytes;
      }
    } else if (extraBytes < 0) {
      throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
    }
  },
  prepareReader: function(data) {
    this.reader = readerFor(data);
  },
  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function(data) {
    this.prepareReader(data);
    this.readEndOfCentral();
    this.readCentralDir();
    this.readLocalFiles();
  }
};
var zipEntries = ZipEntries$1;
var utils = requireUtils();
var external = external$3;
var utf8 = utf8$5;
var ZipEntries = zipEntries;
var Crc32Probe = Crc32Probe_1;
var nodejsUtils = nodejsUtils$2;
function checkEntryCRC32(zipEntry2) {
  return new external.Promise(function(resolve, reject) {
    var worker = zipEntry2.decompressed.getContentWorker().pipe(new Crc32Probe());
    worker.on("error", function(e) {
      reject(e);
    }).on("end", function() {
      if (worker.streamInfo.crc32 !== zipEntry2.decompressed.crc32) {
        reject(new Error("Corrupted zip : CRC32 mismatch"));
      } else {
        resolve();
      }
    }).resume();
  });
}
var load = function(data, options) {
  var zip = this;
  options = utils.extend(options || {}, {
    base64: false,
    checkCRC32: false,
    optimizedBinaryString: false,
    createFolders: false,
    decodeFileName: utf8.utf8decode
  });
  if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
    return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
  }
  return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data2) {
    var zipEntries2 = new ZipEntries(options);
    zipEntries2.load(data2);
    return zipEntries2;
  }).then(function checkCRC32(zipEntries2) {
    var promises = [external.Promise.resolve(zipEntries2)];
    var files = zipEntries2.files;
    if (options.checkCRC32) {
      for (var i = 0; i < files.length; i++) {
        promises.push(checkEntryCRC32(files[i]));
      }
    }
    return external.Promise.all(promises);
  }).then(function addFiles(results) {
    var zipEntries2 = results.shift();
    var files = zipEntries2.files;
    for (var i = 0; i < files.length; i++) {
      var input = files[i];
      var unsafeName = input.fileNameStr;
      var safeName = utils.resolve(input.fileNameStr);
      zip.file(safeName, input.decompressed, {
        binary: true,
        optimizedBinaryString: true,
        date: input.date,
        dir: input.dir,
        comment: input.fileCommentStr.length ? input.fileCommentStr : null,
        unixPermissions: input.unixPermissions,
        dosPermissions: input.dosPermissions,
        createFolders: options.createFolders
      });
      if (!input.dir) {
        zip.file(safeName).unsafeOriginalName = unsafeName;
      }
    }
    if (zipEntries2.zipComment.length) {
      zip.comment = zipEntries2.zipComment;
    }
    return zip;
  });
};
function JSZip() {
  if (!(this instanceof JSZip)) {
    return new JSZip();
  }
  if (arguments.length) {
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  }
  this.files = /* @__PURE__ */ Object.create(null);
  this.comment = null;
  this.root = "";
  this.clone = function() {
    var newObj = new JSZip();
    for (var i in this) {
      if (typeof this[i] !== "function") {
        newObj[i] = this[i];
      }
    }
    return newObj;
  };
}
JSZip.prototype = object;
JSZip.prototype.loadAsync = load;
JSZip.support = support$4;
JSZip.defaults = defaults$1;
JSZip.version = "3.10.1";
JSZip.loadAsync = function(content, options) {
  return new JSZip().loadAsync(content, options);
};
JSZip.external = external$3;
var lib = JSZip;
const JSZip$1 = /* @__PURE__ */ getDefaultExportFromCjs(lib);
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const getPDFDocument = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument(arrayBuffer);
  return await loadingTask.promise;
};
const generateThumbnail = async (file) => {
  try {
    const pdf = await getPDFDocument(file);
    return await getPageThumbnail(pdf, 1);
  } catch (error2) {
    console.error("Error generating thumbnail:", error2);
    return { thumbnail: null, numPages: 0 };
  }
};
const getPageThumbnail = async (pdfOrFile, pageNumber) => {
  try {
    let pdf = pdfOrFile;
    if (pdfOrFile instanceof File || pdfOrFile instanceof Blob) {
      pdf = await getPDFDocument(pdfOrFile);
    }
    const page = await pdf.getPage(pageNumber);
    const scale2 = 1;
    const viewport = page.getViewport({ scale: scale2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    return {
      thumbnail: canvas.toDataURL(),
      numPages: pdf.numPages,
      originalWidth: viewport.width,
      originalHeight: viewport.height,
      pdfDoc: pdf
      // Return the pdfjs doc for further use if needed
    };
  } catch (error2) {
    console.error("Error getting page thumbnail", error2);
    return { thumbnail: null, numPages: 0 };
  }
};
const getPageTextCheck = async (file, pageIndex) => {
  try {
    const pdf = await getPDFDocument(file);
    const page = await pdf.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();
    const styles = textContent.styles;
    const rawItems = textContent.items.map((item) => {
      const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
      const fontHeight = Math.sqrt(item.transform[2] * item.transform[2] + item.transform[3] * item.transform[3]);
      const width = item.width ? item.width * viewport.scale : 0;
      let fontName = item.fontName;
      if (styles && styles[fontName]) {
        fontName = styles[fontName].fontFamily;
      }
      return {
        str: item.str,
        x: tx[4],
        y: tx[5] - fontHeight,
        width,
        height: fontHeight,
        normX: tx[4] / viewport.width,
        normY: (tx[5] - fontHeight) / viewport.height,
        normWidth: width / viewport.width,
        normHeight: fontHeight / viewport.height,
        fontSize: fontHeight,
        fontName,
        // Real font family name
        dir: item.dir,
        transform: item.transform
      };
    });
    const blocks = [];
    rawItems.sort((a, b) => {
      if (Math.abs(a.y - b.y) > 10) return a.y - b.y;
      return a.x - b.x;
    });
    let currentBlock = null;
    rawItems.forEach((item) => {
      if (!currentBlock) {
        currentBlock = {
          ...item,
          fontSize: item.fontSize,
          fontName: item.fontName,
          items: [item]
        };
        return;
      }
      const prevItem = currentBlock.items[currentBlock.items.length - 1];
      const lineHeight = Math.max(item.height, prevItem.height);
      const isSameLine = Math.abs(item.y - prevItem.y) < lineHeight * 0.5;
      const isNextLine = Math.abs(item.y - prevItem.y) < lineHeight * 3 && Math.abs(item.y - prevItem.y) > lineHeight * 0.1;
      const isHorizontalClose = item.x - (prevItem.x + prevItem.width) < lineHeight * 1.5;
      const sameFontSize = Math.abs(item.fontSize - currentBlock.fontSize) < 4;
      const sameFont = item.fontName === currentBlock.fontName;
      if (sameFontSize && sameFont && (isSameLine && isHorizontalClose || isNextLine && Math.abs(item.x - currentBlock.x) < 50)) {
        currentBlock.items.push(item);
        const gap = item.x - (prevItem.x + prevItem.width);
        const separator = isNextLine ? "\n" : gap > 2 ? " " : "";
        currentBlock.str += separator + item.str;
        const rightEdge = Math.max(currentBlock.x + currentBlock.width, item.x + item.width);
        currentBlock.width = rightEdge - currentBlock.x;
        const bottomEdge = Math.max(currentBlock.y + currentBlock.height, item.y + item.height);
        currentBlock.height = bottomEdge - currentBlock.y;
        currentBlock.normWidth = currentBlock.width / viewport.width;
        currentBlock.normHeight = currentBlock.height / viewport.height;
      } else {
        blocks.push(currentBlock);
        currentBlock = { ...item, items: [item] };
      }
    });
    if (currentBlock) blocks.push(currentBlock);
    return blocks.map((block) => ({
      text: block.str,
      x: block.x / viewport.width,
      y: (viewport.height - (block.y + block.height)) / viewport.height,
      normWidth: block.width / viewport.width,
      normHeight: block.height / viewport.height,
      fontSize: block.fontSize,
      fontName: block.fontName,
      hasEOL: block.hasEOL
    }));
  } catch (error2) {
    console.error("Error extracting text", error2);
    return [];
  }
};
const extractPages = async (file, pageIndices) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));
  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const compressPDF = async (file, qualityLevel = "recommended") => {
  const settings = {
    extreme: { scale: 0.8, quality: 0.4 },
    recommended: { scale: 1, quality: 0.7 },
    less: { scale: 1, quality: 0.9 }
  };
  const { scale: scale2, quality } = settings[qualityLevel] || settings.recommended;
  await file.arrayBuffer();
  const pdfToLoad = await getPDFDocument(file);
  const numPages = pdfToLoad.numPages;
  const newPdf = await PDFDocument.create();
  for (let i = 1; i <= numPages; i++) {
    const page = await pdfToLoad.getPage(i);
    const viewport = page.getViewport({ scale: scale2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    const imgDataUrl = canvas.toDataURL("image/jpeg", quality);
    const imgBytes = await fetch(imgDataUrl).then((res) => res.arrayBuffer());
    const jpgImage = await newPdf.embedJpg(imgBytes);
    const jpgDims = jpgImage.scale(1 / scale2);
    const newPage = newPdf.addPage([jpgDims.width * scale2, jpgDims.height * scale2]);
    newPage.setSize(jpgDims.width, jpgDims.height);
    newPage.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: jpgDims.width,
      height: jpgDims.height
    });
  }
  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const convertPDFToWord = async (file) => {
  await file.arrayBuffer();
  const pdf = await getPDFDocument(file);
  const numPages = pdf.numPages;
  const doc = new Document({
    sections: []
  });
  const children = [];
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items.map((item) => ({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      hasEOL: item.hasEOL
    }));
    items.sort((a, b) => {
      if (Math.abs(a.y - b.y) > 5) {
        return b.y - a.y;
      }
      return a.x - b.x;
    });
    let currentLineY = -1;
    let currentLineText = [];
    items.forEach((item) => {
      if (currentLineY === -1) currentLineY = item.y;
      if (Math.abs(item.y - currentLineY) > 5) {
        children.push(new Paragraph({
          children: [new TextRun(currentLineText.join(" "))]
        }));
        currentLineText = [];
        currentLineY = item.y;
      }
      currentLineText.push(item.str);
    });
    if (currentLineText.length > 0) {
      children.push(new Paragraph({
        children: [new TextRun(currentLineText.join(" "))]
      }));
    }
  }
  doc.addSection({
    properties: {},
    children
  });
  const blob2 = await Packer.toBlob(doc);
  return blob2;
};
const mergePDFs = async (files) => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const protectPDF = async (file, password) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  pdfDoc.encrypt({
    userPassword: password,
    ownerPassword: password,
    permissions: {
      printing: "highResolution",
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: false,
      contentAccessibility: false,
      documentAssembly: false
    }
  });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const unlockPDF = async (file, password) => {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
  } catch (error2) {
    throw new Error("Incorrect password or file error");
  }
};
const rotatePDF = async (file, rotations) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  Object.keys(rotations).forEach((pageIndex) => {
    const page = pages[parseInt(pageIndex)];
    if (page) {
      page.setRotation(degrees(rotations[pageIndex]));
    }
  });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const pdfToImages = async (file) => {
  await file.arrayBuffer();
  const pdf = await getPDFDocument(file);
  const numPages = pdf.numPages;
  const zip = new JSZip$1();
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const scale2 = 2;
    const viewport = page.getViewport({ scale: scale2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const imgDataBase64 = imgData.split(",")[1];
    zip.file(`page_${i}.jpg`, imgDataBase64, { base64: true });
  }
  return await zip.generateAsync({ type: "blob" });
};
const imagesToPDF = async (files) => {
  const newPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      image = await newPdf.embedJpg(arrayBuffer);
    } else if (file.type === "image/png") {
      image = await newPdf.embedPng(arrayBuffer);
    } else {
      try {
        image = await newPdf.embedJpg(arrayBuffer);
      } catch (e) {
        try {
          image = await newPdf.embedPng(arrayBuffer);
        } catch (e2) {
          continue;
        }
      }
    }
    const { width, height } = image.scale(1);
    const page = newPdf.addPage([width, height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height
    });
  }
  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const addSignatureToPDF = async (file, signatureImageBase64, position) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const page = pages[position.pageIndex];
  if (page) {
    const pngImage = await pdfDoc.embedPng(signatureImageBase64);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const x = position.x * pageWidth;
    const y = pageHeight - position.y * pageHeight - position.height * pageHeight;
    page.drawImage(pngImage, {
      x,
      y,
      width: position.width * pageWidth,
      height: position.height * pageHeight
    });
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? rgb(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ) : rgb(0, 0, 0);
};
const getStandardFont = (family, bold, italic) => {
  if (family && family.toLowerCase().includes("times")) {
    if (bold && italic) return StandardFonts.TimesRomanBoldItalic;
    if (bold) return StandardFonts.TimesRomanBold;
    if (italic) return StandardFonts.TimesRomanItalic;
    return StandardFonts.TimesRoman;
  }
  if (family && family.toLowerCase().includes("courier")) {
    if (bold && italic) return StandardFonts.CourierBoldOblique;
    if (bold) return StandardFonts.CourierBold;
    if (italic) return StandardFonts.CourierOblique;
    return StandardFonts.Courier;
  }
  if (bold && italic) return StandardFonts.HelveticaBoldOblique;
  if (bold) return StandardFonts.HelveticaBold;
  if (italic) return StandardFonts.HelveticaOblique;
  return StandardFonts.Helvetica;
};
const applyAnnotations = async (file, annotations) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  for (const ann of annotations) {
    const page = pages[ann.pageIndex];
    if (!page) continue;
    const fontToEmbed = getStandardFont(ann.fontFamily, ann.isBold, ann.isItalic);
    const font = await pdfDoc.embedFont(fontToEmbed);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const x = ann.x * pageWidth;
    const y = pageHeight - ann.y * pageHeight;
    const annColor = hexToRgb(ann.color || "#000000");
    const borderColor = hexToRgb(ann.strokeColor || "#000000");
    if (ann.isReplacement) {
      const maskX = ann.originalX * pageWidth;
      const pdfTopY = pageHeight - ann.originalY * pageHeight;
      const maskW = ann.originalWidth * pageWidth;
      const maskH = ann.originalHeight * pageHeight;
      page.drawRectangle({
        x: maskX - 2,
        y: pdfTopY - maskH - 2,
        width: maskW + 4,
        height: maskH + 4,
        color: rgb(1, 1, 1),
        opacity: 1
      });
      const fontSize = ann.fontSize || 12;
      const text = ann.text;
      const maxWidth = maskW * 1.5;
      const words = text.split(" ");
      let line = "";
      let currentTempY = pdfTopY - fontSize;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxWidth && n > 0) {
          page.drawText(line, {
            x: maskX,
            y: currentTempY,
            size: fontSize,
            font,
            color: annColor
          });
          line = words[n] + " ";
          currentTempY -= fontSize * 1.2;
        } else {
          line = testLine;
        }
      }
      page.drawText(line, {
        x: maskX,
        y: currentTempY,
        size: fontSize,
        font,
        color: annColor
      });
      continue;
    }
    if (ann.type === "text") {
      const textSize = ann.fontSize || 12;
      if (ann.backgroundColor) {
        const textWidth = font.widthOfTextAtSize(ann.text, textSize);
        const textHeight = textSize;
        page.drawRectangle({
          x,
          y: y - textHeight,
          width: textWidth + 4,
          height: textHeight + 4,
          color: hexToRgb(ann.backgroundColor),
          opacity: 1
        });
      }
      page.drawText(ann.text, {
        x: x + (ann.backgroundColor ? 2 : 0),
        y: y - textSize,
        size: textSize,
        font,
        color: annColor
      });
    } else if (ann.type === "rectangle") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      page.drawRectangle({
        x,
        y: y - h,
        width: w,
        height: h,
        borderColor,
        borderWidth: ann.strokeWidth || 1,
        color: ann.fillColor ? hexToRgb(ann.fillColor) : void 0,
        opacity: ann.opacity || 1
      });
    } else if (ann.type === "circle") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      const size = Math.min(w, h);
      page.drawCircle({
        x: x + w / 2,
        y: y - h / 2,
        size: size / 2,
        borderColor,
        borderWidth: ann.strokeWidth || 1,
        color: ann.fillColor ? hexToRgb(ann.fillColor) : void 0
      });
    } else if (ann.type === "line") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      page.drawLine({
        start: { x, y },
        end: { x: x + w, y: y - h },
        thickness: ann.strokeWidth || 2,
        color: borderColor
      });
    } else if (ann.type === "highlight") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      page.drawRectangle({
        x,
        y: y - h,
        width: w,
        height: h,
        color: rgb(1, 1, 0),
        // Yellow
        opacity: 0.35
      });
    } else if (ann.type === "image") {
      if (ann.imageData) {
        let embeddedImage;
        if (ann.imageData.startsWith("data:image/png")) {
          embeddedImage = await pdfDoc.embedPng(ann.imageData);
        } else {
          embeddedImage = await pdfDoc.embedJpg(ann.imageData);
        }
        const w = ann.width * pageWidth;
        const h = ann.height * pageHeight;
        page.drawImage(embeddedImage, {
          x,
          y: y - h,
          width: w,
          height: h
        });
      }
    }
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
var FileSaver_min = { exports: {} };
(function(module, exports$1) {
  (function(a, b) {
    b();
  })(commonjsGlobal, function() {
    function b(a2, b2) {
      return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
    }
    function c(a2, b2, c2) {
      var d2 = new XMLHttpRequest();
      d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
        g(d2.response, b2, c2);
      }, d2.onerror = function() {
        console.error("could not download file");
      }, d2.send();
    }
    function d(a2) {
      var b2 = new XMLHttpRequest();
      b2.open("HEAD", a2, false);
      try {
        b2.send();
      } catch (a3) {
      }
      return 200 <= b2.status && 299 >= b2.status;
    }
    function e(a2) {
      try {
        a2.dispatchEvent(new MouseEvent("click"));
      } catch (c2) {
        var b2 = document.createEvent("MouseEvents");
        b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
      }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
      var i = f.URL || f.webkitURL, j = document.createElement("a");
      g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
        i.revokeObjectURL(j.href);
      }, 4e4), setTimeout(function() {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
      if (g2 = g2 || f2.name || "download", "string" != typeof f2) navigator.msSaveOrOpenBlob(b(f2, h), g2);
      else if (d(f2)) c(f2, g2, h);
      else {
        var i = document.createElement("a");
        i.href = f2, i.target = "_blank", setTimeout(function() {
          e(i);
        });
      }
    } : function(b2, d2, e2, g2) {
      if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2) return c(b2, d2, e2);
      var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function() {
          var a2 = k.result;
          a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
        }, k.readAsDataURL(b2);
      } else {
        var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
        g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
          l.revokeObjectURL(m);
        }, 4e4);
      }
    });
    f.saveAs = g.saveAs = g, module.exports = g;
  });
})(FileSaver_min);
var FileSaver_minExports = FileSaver_min.exports;
const Merge = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    setIsProcessing(true);
    const newFiles = await Promise.all(acceptedFiles.map(async (file) => {
      const { thumbnail, numPages } = await generateThumbnail(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        thumbnail,
        numPages,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2)
        // MB
      };
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setIsProcessing(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] }
  });
  const removeFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };
  const handleMerge = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const mergedBlob = await mergePDFs(files.map((f) => f.file));
      FileSaver_minExports.saveAs(mergedBlob, "merged.pdf");
    } catch (error2) {
      console.error("Merge failed", error2);
      alert("Failed to merge PDFs");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Merge PDF | Combine PDF Files for Free | SafePDF" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Merge multiple PDF files into one document securely in your browser. No upload required, 100% free and private." }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://safepdf.site/merge" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Merge PDF Files" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Combine PDFs in the order you want with the easiest PDF merger available." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1200px] flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between mb-4 gap-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-slate-900 dark:text-white text-lg font-bold leading-tight", children: [
            "Selected Files (",
            files.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs("button", { onClick: () => setFiles([]), className: "flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors", children: [
            /* @__PURE__ */ jsx(Trash2, { size: 18 }),
            /* @__PURE__ */ jsx("span", { children: "Clear All" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center gap-3 aspect-[3/4] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsx("input", { ...getInputProps() }),
            /* @__PURE__ */ jsx("div", { className: "size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(FileUp, { size: 24 }) }),
            /* @__PURE__ */ jsx("p", { className: "text-primary font-bold text-center text-sm px-4", children: "Add files" })
          ] }),
          /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: files, onReorder: setFiles, className: "contents", children: files.map((file) => /* @__PURE__ */ jsx(Reorder.Item, { value: file, className: "contents", children: /* @__PURE__ */ jsxs("div", { className: "group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing overflow-hidden aspect-[3/4]", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => removeFile(file.id), className: "absolute top-2 right-2 z-10 size-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-500 hover:text-red-500 hover:bg-red-50 shadow-sm border border-slate-200 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden", children: file.thumbnail ? /* @__PURE__ */ jsx("div", { className: "w-full h-full shadow-lg rounded-sm relative", children: /* @__PURE__ */ jsx("img", { src: file.thumbnail, alt: "Preview", className: "w-full h-full object-contain bg-white" }) }) : /* @__PURE__ */ jsx("div", { className: "text-slate-400", children: "Loading..." }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-900 dark:text-white text-xs font-bold truncate mb-1", title: file.name, children: file.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400 text-[10px] font-medium uppercase tracking-wide", children: [
                file.numPages,
                " Pages • ",
                file.size,
                " MB"
              ] })
            ] })
          ] }) }, file.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[340px] flex flex-col gap-6 shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-24", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-slate-900 dark:text-white text-xl font-bold mb-6", children: "Merge Options" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Drag and drop files to reorder them before merging." }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleMerge,
              disabled: files.length < 2 || isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { children: "Merge PDF" }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30", children: [
          /* @__PURE__ */ jsx("div", { className: "size-8 rounded-full bg-white dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-primary shadow-sm", children: /* @__PURE__ */ jsx(Shield, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-slate-900 dark:text-white text-sm font-bold mb-1", children: "100% Secure & Private" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs leading-relaxed", children: "Your files are processed directly in your browser. No data leaves your device." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Split = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState(/* @__PURE__ */ new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  useEffect(() => {
    if (!file) return;
    const loadPages = async () => {
      setIsLoadingPages(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const newPages = [];
        for (let i = 1; i <= numPages; i++) {
          const { thumbnail } = await getPageThumbnail(pdf, i);
          newPages.push({ pageNumber: i, thumbnail });
        }
        setPages(newPages);
      } catch (error2) {
        console.error("Error loading pages", error2);
      }
      setIsLoadingPages(false);
    };
    loadPages();
  }, [file]);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setPages([]);
      setSelectedPages(/* @__PURE__ */ new Set());
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const togglePage = (pageNumber) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageNumber)) {
      newSelected.delete(pageNumber);
    } else {
      newSelected.add(pageNumber);
    }
    setSelectedPages(newSelected);
  };
  const handleSplit = async () => {
    if (!file || selectedPages.size === 0) return;
    setIsProcessing(true);
    try {
      const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
      const pageIndices = sortedPages.map((p) => p - 1);
      const newPdfBlob = await extractPages(file, pageIndices);
      FileSaver_minExports.saveAs(newPdfBlob, `split_${file.name}`);
    } catch (error2) {
      console.error("Split failed", error2);
      alert("Failed to split PDF");
    }
    setIsProcessing(false);
  };
  const selectAll = () => {
    if (pages.length === 0) return;
    if (selectedPages.size === pages.length) {
      setSelectedPages(/* @__PURE__ */ new Set());
    } else {
      setSelectedPages(new Set(pages.map((p) => p.pageNumber)));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Split PDF File" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Select specific pages to extract into a new PDF document." })
    ] }),
    !file ? /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "relative flex flex-col items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "size-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(FileUp, { size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Drag & drop your PDF here" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: "or click to browse your files" })
      ] })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2", children: "Page Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("button", { onClick: selectAll, className: "text-sm font-medium text-primary hover:text-primary/80 transition-colors", children: selectedPages.size === pages.length ? "Deselect All" : "Select All" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: [
              file.name,
              " (",
              pages.length,
              " Pages)"
            ] })
          ] })
        ] }),
        isLoadingPages ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary mb-4", size: 40 }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading pages..." })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: pages.map((page) => {
          const isSelected = selectedPages.has(page.pageNumber);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => togglePage(page.pageNumber),
              className: "group relative flex flex-col gap-2 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxs("div", { className: clsx(
                  "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border-2 overflow-hidden transition-all hover:-translate-y-1",
                  isSelected ? "border-primary" : "border-transparent border-slate-200 dark:border-slate-600 hover:border-primary/50"
                ), children: [
                  /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: `Page ${page.pageNumber}`, className: clsx("w-full h-full object-contain", isSelected ? "opacity-40" : "opacity-100") }),
                  isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-primary text-white rounded-full p-1 shadow-md transform scale-110", children: /* @__PURE__ */ jsx(Check, { size: 20 }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm", children: [
                    "P. ",
                    page.pageNumber
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: clsx("text-center text-sm font-medium", isSelected ? "text-primary" : "text-slate-500 dark:text-slate-400"), children: isSelected ? "Selected" : `Page ${page.pageNumber}` })
              ]
            },
            page.pageNumber
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-96 shrink-0 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sticky top-24", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Split Options" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-2", children: [
                "Selected Pages: ",
                selectedPages.size
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: selectedPages.size > 0 ? Array.from(selectedPages).sort((a, b) => a - b).join(", ") : "No pages selected" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSplit,
                disabled: selectedPages.size === 0 || isProcessing,
                className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
                children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("span", { children: "Extract Pages" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
                ] })
              }
            ),
            /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "w-full py-2 text-sm text-slate-500 hover:text-red-500 transition-colors", children: "Cancel / New File" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Secure" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "All splitting happens in your browser. Your PDF file is never uploaded to any server." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Compress = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("recommended");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileSize, setFileSize] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setFileSize((acceptedFiles[0].size / 1024 / 1024).toFixed(2));
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const compressedBlob = await compressPDF(file, level);
      FileSaver_minExports.saveAs(compressedBlob, `compressed_${file.name}`);
    } catch (error2) {
      console.error("Compression failed", error2);
      alert("Failed to compress PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Compress PDF File" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Reduce file size locally. No servers involved." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 flex flex-col gap-4", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer group", children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to add file or drag and drop" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white px-1", children: "Selected File" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 size-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "picture_as_pdf" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 dark:text-white truncate", children: file.name }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded", children: [
              fileSize,
              " MB"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 20 }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 flex flex-col h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-1", children: "Compression Level" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Choose how much to reduce file size." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: [
          { id: "extreme", label: "Extreme", desc: "Less quality, high compression" },
          { id: "recommended", label: "Recommended", desc: "Good quality, good compression", badge: "Best" },
          { id: "less", label: "Less Compression", desc: "High quality, less compression" }
        ].map((opt) => /* @__PURE__ */ jsxs("label", { className: clsx(
          "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all",
          level === opt.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
          // Unselected
        ), children: [
          /* @__PURE__ */ jsx("input", { type: "radio", name: "compression", value: opt.id, checked: level === opt.id, onChange: () => setLevel(opt.id), className: "sr-only" }),
          /* @__PURE__ */ jsx("span", { className: "flex flex-1", children: /* @__PURE__ */ jsxs("span", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: clsx("block text-sm font-bold", level === opt.id ? "text-primary" : "text-slate-900 dark:text-white"), children: opt.label }),
              opt.badge && /* @__PURE__ */ jsx("span", { className: "bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide", children: opt.badge })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400", children: opt.desc })
          ] }) }),
          level === opt.id && /* @__PURE__ */ jsx(CheckCircle, { className: "text-primary text-xl", size: 20 }),
          level !== opt.id && /* @__PURE__ */ jsx("div", { className: "size-5 rounded-full border border-slate-300 dark:border-slate-600" })
        ] }, opt.id)) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCompress,
            disabled: !file || isProcessing,
            className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
            children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              "Compress PDF ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "text-lg", size: 20 })
            ] })
          }
        )
      ] }) })
    ] })
  ] });
};
const PDFToWord = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const docBlob = await convertPDFToWord(file);
      FileSaver_minExports.saveAs(docBlob, `${file.name.replace(".pdf", "")}.docx`);
    } catch (error2) {
      console.error("Conversion failed", error2);
      alert("Failed to convert PDF to Word");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "PDF to Word" }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: [
        "Convert your PDF files to editable Word documents (DOCX).",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-sm italic opacity-75", children: "(Note: Client-side conversion extracts text but may lose complex layout)" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to select PDF or drag and drop" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(FileText, { size: 40 }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: file.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400", children: [
          (file.size / 1024 / 1024).toFixed(2),
          " MB"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 w-full max-w-md", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Change File" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleConvert,
            disabled: isProcessing,
            className: "flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5",
            children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Convert to Word" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-start gap-3 max-w-lg p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
      /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Private Conversion" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "Unlike other converters, we don't send your file to a server. Conversion happens right here using your browser's power." })
      ] })
    ] })
  ] });
};
const Protect = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleProtect = async () => {
    if (!file || !password) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsProcessing(true);
    try {
      const protectedBlob = await protectPDF(file, password);
      FileSaver_minExports.saveAs(protectedBlob, `protected_${file.name}`);
    } catch (error2) {
      console.error("Protection failed", error2);
      alert("Failed to protect PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Protect PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Encrypt your PDF file with a password to ensure security." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center p-6", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Dropp PDF here" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6 aspect-square justify-center relative", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Lock, { size: 40 }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2 break-all", children: file.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400", children: [
            (file.size / 1024 / 1024).toFixed(2),
            " MB"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-4", children: "Security Settings" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: "Set Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "Enter password",
                  className: "w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent dark:text-white focus:ring-primary focus:border-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: "Confirm Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "Repeat password",
                  className: "w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent dark:text-white focus:ring-primary focus:border-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleProtect,
                disabled: !file || !password || isProcessing,
                className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  "Protect PDF ",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
                ] })
              }
            ),
            password !== confirmPassword && password && confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-2 text-center", children: "Passwords do not match" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "Strong Encryption" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "We use standard PDF encryption. The password is never sent to our servers." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Unlock = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error2, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setError("");
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleUnlock = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    setError("");
    try {
      const unlockedBlob = await unlockPDF(file, password);
      FileSaver_minExports.saveAs(unlockedBlob, `unlocked_${file.name}`);
    } catch (error22) {
      console.error("Unlock failed", error22);
      setError("Incorrect password or failed to unlock.");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Unlock PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Remove password security from PDFs, making them free to use." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center p-6", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Drop PDF here" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6 aspect-square justify-center relative", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Unlock$1, { size: 40 }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2 break-all", children: file.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400", children: [
            (file.size / 1024 / 1024).toFixed(2),
            " MB"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-4", children: "Unlock Settings" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Enter the current password to remove it." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: "Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter current password",
                className: clsx(
                  "w-full rounded-lg bg-transparent dark:text-white focus:ring-primary focus:border-primary",
                  error2 ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-600"
                )
              }
            ),
            error2 && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-medium", children: error2 })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleUnlock,
              disabled: !file || !password || isProcessing,
              className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                "Unlock PDF ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
              ] })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "Secure Decryption" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "Your password allows us to unlock the file locally. It is not stored or sent anywhere." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Rotate = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [rotations, setRotations] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  useEffect(() => {
    if (!file) return;
    const loadPages = async () => {
      setIsLoadingPages(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const newPages = [];
        for (let i = 1; i <= numPages; i++) {
          const { thumbnail } = await getPageThumbnail(pdf, i);
          newPages.push({ pageNumber: i, thumbnail });
        }
        setPages(newPages);
        setRotations({});
      } catch (error2) {
        console.error("Error loading pages", error2);
      }
      setIsLoadingPages(false);
    };
    loadPages();
  }, [file]);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const rotatePage = (pageIndex, direction) => {
    setRotations((prev) => {
      const current = prev[pageIndex] || 0;
      const change = direction === "cw" ? 90 : -90;
      let next = (current + change) % 360;
      if (next < 0) next += 360;
      return { ...prev, [pageIndex]: next };
    });
  };
  const rotateAll = (direction) => {
    setRotations((prev) => {
      const newRotations = {};
      pages.forEach((_, idx) => {
        const current = prev[idx] || 0;
        const change = direction === "cw" ? 90 : -90;
        let next = (current + change) % 360;
        if (next < 0) next += 360;
        newRotations[idx] = next;
      });
      return newRotations;
    });
  };
  const handleSave = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const newPdfBlob = await rotatePDF(file, rotations);
      FileSaver_minExports.saveAs(newPdfBlob, `rotated_${file.name}`);
    } catch (error2) {
      console.error("Rotate failed", error2);
      alert("Failed to rotate PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Rotate PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Rotate specific pages or the entire document." })
    ] }),
    !file ? /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "relative flex flex-col items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "size-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(FileUp, { size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Drag & drop your PDF here" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: "or click to browse your files" })
      ] })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-700 dark:text-slate-200", children: "Page Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => rotateAll("ccw"), className: "px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
              " Rotate All Left"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => rotateAll("cw"), className: "px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RotateCw, { size: 16 }),
              " Rotate All Right"
            ] })
          ] })
        ] }),
        isLoadingPages ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 40 }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: pages.map((page, index) => {
          const rotation = rotations[index] || 0;
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full h-full p-2 transition-transform duration-300", style: { transform: `rotate(${rotation}deg)` }, children: /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: `Page ${page.pageNumber}`, className: "w-full h-full object-contain" }) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm", children: [
                "P. ",
                page.pageNumber
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => rotatePage(index, "ccw"), className: "p-1.5 rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-sm", children: /* @__PURE__ */ jsx(RotateCcw, { size: 14 }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => rotatePage(index, "cw"), className: "p-1.5 rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-sm", children: /* @__PURE__ */ jsx(RotateCw, { size: 14 }) })
            ] })
          ] }, index);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-6", children: "Rotate Options" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Save Rotated PDF" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setFile(null), className: "flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 transition-colors", children: [
          /* @__PURE__ */ jsx(Trash2, { size: 16 }),
          " Cancel"
        ] })
      ] })
    ] })
  ] });
};
const Organize = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  useEffect(() => {
    if (!file) return;
    const loadPages = async () => {
      setIsLoadingPages(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const newPages = [];
        for (let i = 1; i <= numPages; i++) {
          const { thumbnail } = await getPageThumbnail(pdf, i);
          newPages.push({ id: `p-${i}`, originalIndex: i - 1, thumbnail, pageNumber: i });
        }
        setPages(newPages);
      } catch (error2) {
        console.error("Error loading pages", error2);
      }
      setIsLoadingPages(false);
    };
    loadPages();
  }, [file]);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const removePage = (id) => {
    setPages(pages.filter((p) => p.id !== id));
  };
  const handleSave = async () => {
    if (!file || pages.length === 0) return;
    setIsProcessing(true);
    try {
      const pageIndices = pages.map((p) => p.originalIndex);
      const newPdfBlob = await extractPages(file, pageIndices);
      FileSaver_minExports.saveAs(newPdfBlob, `organized_${file.name}`);
    } catch (error2) {
      console.error("Organize failed", error2);
      alert("Failed to organize PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Organize PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Sort, delete, and reorder PDF pages." })
    ] }),
    !file ? /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "relative flex flex-col items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "size-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(FileUp, { size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Drag & drop your PDF here" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: "or click to browse your files" })
      ] })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-700 dark:text-slate-200", children: "Drag to Reorder" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: [
            pages.length,
            " Pages"
          ] })
        ] }),
        isLoadingPages ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 40 }) }) : /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: pages, onReorder: setPages, className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: pages.map((page) => /* @__PURE__ */ jsxs(Reorder.Item, { value: page, className: "group relative flex flex-col gap-2 cursor-grab active:cursor-grabbing", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary transition-all hover:scale-[1.02]", children: [
            /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              removePage(page.id);
            }, className: "absolute -top-2 -right-2 z-10 p-1.5 rounded-full bg-white dark:bg-slate-600 text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-md border border-slate-200 dark:border-slate-500 opacity-0 group-hover:opacity-100 transition-all", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }),
            /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: `Page ${page.pageNumber}`, className: "w-full h-full object-contain p-2" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm", children: [
              "P. ",
              page.pageNumber
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(GripVertical, { size: 16, className: "text-slate-300" }) })
        ] }, page.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-6", children: "Organize Options" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Save Organized PDF" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setFile(null), className: "flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 transition-colors", children: [
          /* @__PURE__ */ jsx(Trash2, { size: 16 }),
          " Cancel"
        ] })
      ] })
    ] })
  ] });
};
const PDFToJPG = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const zipBlob = await pdfToImages(file);
      FileSaver_minExports.saveAs(zipBlob, `${file.name.replace(".pdf", "")}_images.zip`);
    } catch (error2) {
      console.error("Conversion failed", error2);
      alert("Failed to convert PDF to Images");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "PDF to JPG" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Convert PDF pages to high-quality images. Downloads as a ZIP file." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to select PDF or drag and drop" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Images, { size: 40 }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: file.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400", children: [
          (file.size / 1024 / 1024).toFixed(2),
          " MB"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 w-full max-w-md", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Change File" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleConvert,
            disabled: isProcessing,
            className: "flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5",
            children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Convert to JPGs" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-start gap-3 max-w-lg p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
      /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Secure" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "We convert files locally. Your sensitive documents never leave your device." })
      ] })
    ] })
  ] });
};
const JPGToPDF = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: URL.createObjectURL(file)
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: true
  });
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };
  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBlob = await imagesToPDF(files.map((f) => f.file));
      FileSaver_minExports.saveAs(pdfBlob, "converted_images.pdf");
    } catch (error2) {
      console.error("Conversion failed", error2);
      alert("Failed to convert Images to PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "JPG to PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Convert JPG, PNG images to PDF documents. Drag to reorder." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between mb-4 gap-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-slate-900 dark:text-white text-lg font-bold", children: [
            "Selected Images (",
            files.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setFiles([]), className: "text-sm font-medium text-red-600 hover:text-red-700", children: "Clear All" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "aspect-[3/4] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { ...getInputProps() }),
            /* @__PURE__ */ jsx("div", { className: "size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(FileUp, { size: 20 }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-primary", children: "Add Images" })
          ] }),
          /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: files, onReorder: setFiles, className: "contents", children: files.map((file) => /* @__PURE__ */ jsx(Reorder.Item, { value: file, className: "contents", children: /* @__PURE__ */ jsxs("div", { className: "group relative aspect-[3/4] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => removeFile(file.id), className: "absolute top-1 right-1 z-10 p-1 rounded-full bg-white text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(Trash2, { size: 12 }) }),
            /* @__PURE__ */ jsx("img", { src: file.preview, alt: "preview", className: "w-full h-full object-cover" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" })
          ] }) }, file.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 shrink-0 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Convert Options" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleConvert,
              disabled: files.length === 0 || isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Create PDF" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Private" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "Images are processed locally." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const SignatureCanvas = React.lazy(() => import("./assets/index-BWKWHhB4.js"));
const Sign = () => {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSigCanvas, setShowSigCanvas] = useState(false);
  const [signature2, setSignature] = useState(null);
  const [sigPosition, setSigPosition] = useState({ x: 0.5, y: 0.5 });
  const sigRef = useRef();
  useEffect(() => {
    if (!file) return;
    const loadPage = async () => {
      try {
        const result = await getPageThumbnail(file, pageIndex + 1);
        setPage(result);
      } catch (e) {
        console.error(e);
      }
    };
    loadPage();
  }, [file, pageIndex]);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const saveSignature = () => {
    if (sigRef.current.isEmpty()) return;
    setSignature(sigRef.current.toDataURL());
    setShowSigCanvas(false);
  };
  const handleSign = async () => {
    if (!file || !signature2) return;
    setIsProcessing(true);
    try {
      const signatureWidth = 0.2;
      const signatureHeight = 0.05;
      const blob2 = await addSignatureToPDF(file, signature2, {
        pageIndex,
        x: sigPosition.x - signatureWidth / 2,
        y: sigPosition.y - signatureHeight / 2,
        width: signatureWidth,
        height: signatureHeight
      });
      FileSaver_minExports.saveAs(blob2, `signed_${file.name}`);
    } catch (e) {
      console.error(e);
      alert("Sign failed");
    }
    setIsProcessing(false);
  };
  const handleClickPage = (e) => {
    if (!signature2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSigPosition({ x, y });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 relative", children: [
    showSigCanvas && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl w-full max-w-lg", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4 text-slate-900 dark:text-white", children: "Draw Signature" }),
      /* @__PURE__ */ jsx("div", { className: "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(
        SignatureCanvas,
        {
          ref: sigRef,
          canvasProps: { width: 500, height: 200, className: "sigCanvas" },
          penColor: "black"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => sigRef.current.clear(), className: "px-4 py-2 text-slate-500 hover:text-slate-700", children: "Clear" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowSigCanvas(false), className: "px-4 py-2 text-slate-500 hover:text-slate-700", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: saveSignature, className: "px-6 py-2 bg-primary text-white rounded-lg font-bold", children: "Save" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-center max-w-2xl mx-auto mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black mb-2 dark:text-white", children: "Sign PDF" }) }),
    !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "w-full max-w-2xl h-64 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer border-slate-300 dark:border-slate-700 hover:border-primary", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsx("p", { className: "dark:text-white", children: "Drag & drop PDF" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 w-full max-w-6xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-8 flex justify-center overflow-auto min-h-[500px]", children: page && /* @__PURE__ */ jsxs("div", { className: "relative shadow-lg cursor-crosshair", onClick: handleClickPage, children: [
        /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: "Page", className: "max-w-full h-auto" }),
        signature2 && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: `${sigPosition.x * 100}%`,
              top: `${sigPosition.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20%"
            },
            className: "border-2 border-blue-500 border-dashed bg-white/30",
            children: /* @__PURE__ */ jsx("img", { src: signature2, alt: "Sig", className: "w-full" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "w-80 shrink-0 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold mb-4 dark:text-white", children: "Actions" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setShowSigCanvas(true), className: "w-full py-3 bg-white border-2 border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg font-bold mb-4 hover:border-primary transition-colors", children: signature2 ? "Redraw Signature" : "Create Signature" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4", children: "Click on the document to place your signature." }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4 border-t pt-4 dark:border-slate-700", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setPageIndex(Math.max(0, pageIndex - 1)), disabled: pageIndex === 0, className: "p-2 bg-slate-100 dark:bg-slate-700 rounded disabled:opacity-50", children: "Prev" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm dark:text-white", children: [
              "Page ",
              pageIndex + 1
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setPageIndex(pageIndex + 1), disabled: !page || pageIndex >= page.numPages - 1, className: "p-2 bg-slate-100 dark:bg-slate-700 rounded disabled:opacity-50", children: "Next" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleSign, disabled: !signature2 || isProcessing, className: "w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors disabled:bg-slate-400", children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin mx-auto" }) : "Download Signed PDF" })
      ] })
    ] })
  ] });
};
const Edit = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [tool, setTool] = useState("select");
  const [annotations, setAnnotations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageTextItems, setPageTextItems] = useState([]);
  const [editedTextSchema, setEditedTextSchema] = useState({});
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const fonts = [
    { name: "Helvetica", value: "Helvetica", css: "Helvetica, Arial, sans-serif" },
    { name: "Times Roman", value: "Times", css: '"Times New Roman", Times, serif' },
    { name: "Courier", value: "Courier", css: '"Courier New", Courier, monospace' }
  ];
  useEffect(() => {
    if (!file) return;
    const loadPages = async () => {
      try {
        const result = await getPageThumbnail(file, activePageIndex + 1);
        setPages((prev) => {
          const newPages = [...prev];
          newPages[activePageIndex] = result;
          return newPages;
        });
        const textItems = await getPageTextCheck(file, activePageIndex);
        setPageTextItems(textItems);
      } catch (e) {
        console.error(e);
      }
    };
    loadPages();
  }, [file, activePageIndex]);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setPages([]);
      setActivePageIndex(0);
      setAnnotations([]);
      setHistory([]);
      setHistoryIndex(-1);
      setPageTextItems([]);
      setEditedTextSchema({});
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const addToHistory = (newAnnotations) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations(newAnnotations);
  };
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnnotations(history[historyIndex - 1]);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setAnnotations([]);
    }
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setAnnotations(history[historyIndex + 1]);
    }
  };
  const handleCanvasClick = (e) => {
    if (!pages[activePageIndex]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (tool === "text") {
      const newAnn = { id: crypto.randomUUID(), type: "text", pageIndex: activePageIndex, x, y, text: "Add text", fontSize, color: fontColor, fontFamily: "Helvetica" };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    } else if (tool === "eraser") {
      const newAnn = { id: crypto.randomUUID(), type: "rectangle", pageIndex: activePageIndex, x: x - 0.05, y: y - 0.025, width: 0.1, height: 0.05, strokeWidth: 0, fillColor: "#FFFFFF", opacity: 1 };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    } else if (tool === "rect") {
      const newAnn = { id: crypto.randomUUID(), type: "rectangle", pageIndex: activePageIndex, x: x - 0.1, y: y - 0.05, width: 0.2, height: 0.1, strokeColor: fontColor, strokeWidth: 2 };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    } else if (tool === "highlight") {
      const newAnn = { id: crypto.randomUUID(), type: "highlight", pageIndex: activePageIndex, x: x - 0.1, y: y - 0.025, width: 0.2, height: 0.05 };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    }
    if (tool === "select") {
      if (e.target === e.currentTarget) {
        setSelectedId(null);
      }
    }
  };
  const updateAnnotation = (id, updates) => {
    const updated = annotations.map((a) => a.id === id ? { ...a, ...updates } : a);
    addToHistory(updated);
  };
  const getEditedState = (idx) => {
    if (editedTextSchema[idx]) return editedTextSchema[idx];
    const item = pageTextItems[idx];
    if (!item) return { text: "", fontSize: 12, fontFamily: "Helvetica", isBold: false, isItalic: false, color: "#000000" };
    let family = "Helvetica";
    const fName = (item.fontName || "").toLowerCase();
    if (fName.includes("times") || fName.includes("roman") || fName.includes("serif")) {
      family = "Times";
    } else if (fName.includes("courier") || fName.includes("mono") || fName.includes("typewriter")) {
      family = "Courier";
    }
    return {
      text: item.text || "",
      // Fixed: was item.str
      fontSize: item.fontSize,
      fontFamily: family,
      isBold: fName.includes("bold") || fName.includes("black") || fName.includes("heavy"),
      isItalic: fName.includes("italic") || fName.includes("oblique"),
      color: "#000000"
    };
  };
  const updateContentEdit = (idx, updates) => {
    const currentState = getEditedState(idx);
    setEditedTextSchema({
      ...editedTextSchema,
      [idx]: { ...currentState, ...updates }
    });
  };
  const handleSave = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const replacements = Object.keys(editedTextSchema).map((idx) => {
        const original = pageTextItems[idx];
        const state = editedTextSchema[idx];
        return {
          id: `rep-${idx}`,
          type: "text",
          isReplacement: true,
          pageIndex: activePageIndex,
          x: original.normX,
          y: original.normY + original.normHeight,
          text: state.text,
          fontSize: state.fontSize,
          fontFamily: state.fontFamily,
          isBold: state.isBold,
          isItalic: state.isItalic,
          color: state.color,
          originalX: original.normX,
          originalY: original.normY,
          originalWidth: original.normWidth,
          originalHeight: original.normHeight
        };
      });
      const finalAnnotations = [...annotations, ...replacements];
      const blob2 = await applyAnnotations(file, finalAnnotations);
      FileSaver_minExports.saveAs(blob2, `edited_${file.name}`);
    } catch (e) {
      console.error(e);
      alert("Failed to save edits");
    }
    setIsProcessing(false);
  };
  if (!file) return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-900", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black text-slate-900 dark:text-white mb-2", children: "PDF Editor" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Upload a PDF to start editing" })
    ] }),
    /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 bg-white dark:bg-slate-800 cursor-pointer hover:border-primary transition-colors", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-blue-50 dark:bg-slate-700 rounded-full text-primary", children: /* @__PURE__ */ jsx(Type, { size: 32 }) }),
        /* @__PURE__ */ jsx("p", { className: "font-medium dark:text-white", children: "Drag & drop or Click to Upload" })
      ] })
    ] })
  ] });
  const activePage = pages[activePageIndex];
  const selectedContentIdx = (selectedId == null ? void 0 : selectedId.startsWith("content-")) ? selectedId.split("-")[1] : null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-100 dark:bg-slate-900", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("select"), className: `p-2 rounded-lg ${tool === "select" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(MousePointer2, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("edit-content"), className: `p-2 rounded-lg ${tool === "edit-content" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Edit3, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("text"), className: `p-2 rounded-lg ${tool === "text" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Type, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("rect"), className: `p-2 rounded-lg ${tool === "rect" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Square, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("eraser"), className: `p-2 rounded-lg ${tool === "eraser" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Eraser, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("highlight"), className: `p-2 rounded-lg ${tool === "highlight" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Highlighter, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" }),
        /* @__PURE__ */ jsx("button", { onClick: handleUndo, disabled: historyIndex < 0, className: "p-2 rounded-lg text-slate-500 hover:bg-gray-50 disabled:opacity-30", children: /* @__PURE__ */ jsx(Undo, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: handleRedo, disabled: historyIndex >= history.length - 1, className: "p-2 rounded-lg text-slate-500 hover:bg-gray-50 disabled:opacity-30", children: /* @__PURE__ */ jsx(Redo, { size: 20 }) })
      ] }),
      selectedContentIdx && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur rounded-lg shadow-sm border border-gray-200 animate-in fade-in slide-in-from-top-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Text" }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-200" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            className: "bg-transparent text-sm border-none focus:ring-0 p-0 w-24 text-slate-700 font-medium cursor-pointer",
            value: getEditedState(selectedContentIdx).fontFamily,
            onChange: (e) => updateContentEdit(selectedContentIdx, { fontFamily: e.target.value }),
            children: fonts.map((f) => /* @__PURE__ */ jsx("option", { value: f.value, children: f.name }, f.value))
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-200" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            className: "w-12 bg-transparent text-sm border-none focus:ring-0 p-0 text-center",
            value: Math.round(getEditedState(selectedContentIdx).fontSize),
            onChange: (e) => updateContentEdit(selectedContentIdx, { fontSize: Number(e.target.value) })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "px" }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-200" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updateContentEdit(selectedContentIdx, { isBold: !getEditedState(selectedContentIdx).isBold }),
            className: `p-1 rounded ${getEditedState(selectedContentIdx).isBold ? "bg-blue-100 text-blue-600" : "text-slate-500 hover:bg-gray-50"}`,
            children: /* @__PURE__ */ jsx(Bold, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updateContentEdit(selectedContentIdx, { isItalic: !getEditedState(selectedContentIdx).isItalic }),
            className: `p-1 rounded ${getEditedState(selectedContentIdx).isItalic ? "bg-blue-100 text-blue-600" : "text-slate-500 hover:bg-gray-50"}`,
            children: /* @__PURE__ */ jsx(Italic, { size: 16 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex overflow-hidden relative", children: [
      /* @__PURE__ */ jsx("div", { className: "w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-4", children: "Pages" }),
        /* @__PURE__ */ jsxs("div", { className: "aspect-[1/1.4] bg-gray-100 rounded-lg border-2 border-primary ring-2 ring-primary/20 relative overflow-hidden", children: [
          activePage && /* @__PURE__ */ jsx("img", { src: activePage.thumbnail, className: "w-full h-full object-contain" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded", children: "1" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 bg-gray-100 dark:bg-slate-950 overflow-auto flex justify-center p-10 relative", children: activePage ? /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative bg-white shadow-2xl",
          style: { width: activePage.originalWidth, height: activePage.originalHeight, transform: "scale(1)", transformOrigin: "top center" },
          onClick: handleCanvasClick,
          children: [
            /* @__PURE__ */ jsx("img", { src: activePage.thumbnail, className: "absolute inset-0 w-full h-full pointer-events-none select-none" }),
            tool === "edit-content" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-30", children: pageTextItems.map((item, idx) => {
              var _a2;
              const state = getEditedState(idx);
              const isSelected = selectedId === `content-${idx}`;
              const cssFont = ((_a2 = fonts.find((f) => f.value === state.fontFamily)) == null ? void 0 : _a2.css) || fonts[0].css;
              if (idx === 0) console.log("Rendering Text Items:", pageTextItems.length);
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `absolute rounded transition-all group ${isSelected ? "z-50" : "z-auto hover:z-40"}`,
                  style: {
                    top: `${item.normY * 100}%`,
                    left: `${item.normX * 100}%`,
                    width: `${item.normWidth * 100}%`,
                    height: `${item.normHeight * 100}%`,
                    pointerEvents: "auto"
                  },
                  onClick: (e) => {
                    e.stopPropagation();
                    console.log("Clicked text item", idx);
                    setSelectedId(`content-${idx}`);
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `absolute -inset-1 border-2 border-transparent transition-colors pointer-events-none ${isSelected ? "border-blue-500 bg-white shadow-lg" : "group-hover:border-blue-400 group-hover:bg-blue-50/10"}` }),
                    isSelected ? /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: state.text,
                        autoFocus: true,
                        onChange: (e) => updateContentEdit(idx, { text: e.target.value }),
                        className: "relative w-full h-full p-0 m-0 border-none bg-transparent resize-none overflow-hidden outline-none text-slate-900",
                        style: {
                          fontSize: `${state.fontSize}px`,
                          fontFamily: cssFont,
                          fontWeight: state.isBold ? "bold" : "normal",
                          fontStyle: state.isItalic ? "italic" : "normal",
                          lineHeight: 1.1,
                          whiteSpace: "pre-wrap"
                        }
                      }
                    ) : (
                      // Invisible overlay to capture clicks, but lets you see original text
                      /* @__PURE__ */ jsx("div", { className: "w-full h-full cursor-text", title: `Font: ${state.fontFamily}, Size: ${Math.round(state.fontSize)}px` })
                    )
                  ]
                },
                idx
              );
            }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-20 pointer-events-none", children: tool !== "edit-content" && annotations.filter((a) => a.pageIndex === activePageIndex).map((ann) => /* @__PURE__ */ jsx(
              RndObject,
              {
                ann,
                isSelected: selectedId === ann.id,
                onSelect: () => {
                  setSelectedId(ann.id);
                  setTool("select");
                },
                onChange: (newAttrs) => updateAnnotation(ann.id, newAttrs)
              },
              ann.id
            )) })
          ]
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-slate-400", children: "Loading page..." }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "h-16 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 z-30", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-slate-500 hover:text-primary flex items-center gap-2 text-sm font-medium", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
        " Back to Dashboard"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: handleSave, disabled: isProcessing, className: "flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:bg-slate-400", children: [
        isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 20 }) : /* @__PURE__ */ jsx(Check, { size: 20 }),
        "Apply Edits"
      ] })
    ] })
  ] });
};
const RndObject = ({ ann, isSelected, onSelect, onChange }) => {
  const style = {
    position: "absolute",
    left: `${ann.x * 100}%`,
    top: `${ann.y * 100}%`,
    width: ann.width ? `${ann.width * 100}%` : "auto",
    height: ann.height ? `${ann.height * 100}%` : "auto",
    cursor: isSelected ? "move" : "pointer",
    border: isSelected ? "1px dashed #137fec" : "none",
    zIndex: isSelected ? 10 : 1,
    pointerEvents: "auto"
  };
  const handleContentChange = (e) => {
    onChange({ text: e.target.innerText });
  };
  if (ann.type === "text") {
    return /* @__PURE__ */ jsxs("div", { style, onClick: (e) => {
      e.stopPropagation();
      onSelect();
    }, className: "group", children: [
      isSelected && /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-0 text-[10px] bg-primary text-white px-1 rounded", children: "Text" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          contentEditable: isSelected,
          suppressContentEditableWarning: true,
          onBlur: handleContentChange,
          style: {
            fontSize: `${ann.fontSize}px`,
            color: ann.color,
            fontFamily: "Helvetica, sans-serif",
            whiteSpace: "nowrap",
            outline: "none"
          },
          children: ann.text
        }
      )
    ] });
  }
  if (ann.type === "rectangle") {
    const isEraser = ann.fillColor === "#FFFFFF";
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          ...style,
          border: ann.strokeWidth > 0 ? `${ann.strokeWidth || 2}px solid ${ann.strokeColor}` : "none",
          backgroundColor: ann.fillColor || "transparent",
          opacity: ann.opacity || 1
        },
        onClick: (e) => {
          e.stopPropagation();
          onSelect();
        },
        children: isEraser && isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border border-gray-300 opacity-50 flex items-center justify-center text-[8px] text-gray-500", children: "Eraser" })
      }
    );
  }
  if (ann.type === "highlight") {
    return /* @__PURE__ */ jsx("div", { style: { ...style, backgroundColor: "yellow", opacity: 0.35, mixBlendMode: "multiply" }, onClick: (e) => {
      e.stopPropagation();
      onSelect();
    } });
  }
  return null;
};
const routes = [
  { path: "/", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Home, {}) }) },
  { path: "/merge", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Merge, {}) }) },
  { path: "/split", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Split, {}) }) },
  { path: "/compress", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Compress, {}) }) },
  { path: "/pdf-to-word", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(PDFToWord, {}) }) },
  { path: "/protect", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Protect, {}) }) },
  { path: "/unlock", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Unlock, {}) }) },
  { path: "/rotate", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Rotate, {}) }) },
  { path: "/organize", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Organize, {}) }) },
  { path: "/pdf-to-jpg", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(PDFToJPG, {}) }) },
  { path: "/jpg-to-pdf", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(JPGToPDF, {}) }) },
  { path: "/sign", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Sign, {}) }) },
  { path: "/edit", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Edit, {}) }) }
];
const createApp = ViteReactSSG(
  App,
  { routes },
  ({ app, router, routes: routes2, isClient, initialState }) => {
  }
);
export {
  createApp
};
