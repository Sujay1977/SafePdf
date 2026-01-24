var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsxs, jsx } from "react/jsx-runtime";
import React, { Component, useState, useEffect, useRef, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useLocation, Link, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Heart, Github, X, Menu, Shield, EyeOff, Lock, ServerOff, Cpu, Zap, Ban, Monitor, Download } from "lucide-react";
import { DodoPayments } from "dodopayments-checkout";
import ReactGA from "react-ga4";
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
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return children;
};
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
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
    } catch (error) {
      console.error("Dodo Payments checkout error:", error);
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
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
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
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100 dark:border-blue-900/30", children: /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl", children: "picture_as_pdf" }) }) }),
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
        /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-3xl", children: "picture_as_pdf" }) }),
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
        /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base", children: "check_circle" }) }),
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
function SEO({ title, description, image, url, type = "website", children }) {
  const siteTitle = "SafePDF";
  const siteDescription = "Free, secure, and client-side PDF tools. Merge, split, compress, and edit files in your browser. Your documents never leave your device for complete privacy.";
  const siteUrl = "https://safepdf.site";
  const defaultImage = `${siteUrl}/og-image.png`;
  const metaTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Free Online PDF Tools`;
  const metaDescription = description || siteDescription;
  const metaImage = image ? image.startsWith("http") ? image : `${siteUrl}${image}` : defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: metaTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: metaUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: metaTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: metaUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: metaImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: metaUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: metaTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: metaImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:creator", content: "@Sujay1977" }),
    children
  ] });
}
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
                /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform", children: "arrow_forward" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-[3px] border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-8 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-16 border border-blue-500/30 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center z-10 border border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3", children: [
            /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-white", children: "lock" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center", children: /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-sm text-white font-bold", children: "check" }) }) })
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
      /* @__PURE__ */ jsx("div", { className: "text-slate-400 dark:text-slate-500 pl-4 pr-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "search" }) }) }),
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
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/5 dark:bg-blue-500/10 text-primary group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-3xl", children: tool.icon }) }) }),
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
const Merge = lazy(() => import("./assets/Merge-BxAsfR1v.js"));
const Split = lazy(() => import("./assets/Split-Bx7T25BX.js"));
const Compress = lazy(() => import("./assets/Compress-CNpYJIW4.js"));
const PDFToWord = lazy(() => import("./assets/PDFToWord-B8nfXL4w.js"));
const Protect = lazy(() => import("./assets/Protect-DiF3roKo.js"));
const Unlock = lazy(() => import("./assets/Unlock-ZHgcgOFm.js"));
const Rotate = lazy(() => import("./assets/Rotate-DciGl04P.js"));
const Organize = lazy(() => import("./assets/Organize-8TiWzTBq.js"));
const PDFToJPG = lazy(() => import("./assets/PDFToJPG-DXMbdE5F.js"));
const JPGToPDF = lazy(() => import("./assets/JPGToPDF-CbuqVekx.js"));
const Sign = lazy(() => import("./assets/Sign-Dak_VuFw.js"));
const Edit = lazy(() => import("./assets/Edit-COnbxr7A.js"));
const Loading = () => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) });
const routes = [
  { path: "/", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Home, {}) }) },
  { path: "/merge", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Merge, {}) }) }) },
  { path: "/split", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Split, {}) }) }) },
  { path: "/compress", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Compress, {}) }) }) },
  { path: "/pdf-to-word", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(PDFToWord, {}) }) }) },
  { path: "/protect", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Protect, {}) }) }) },
  { path: "/unlock", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Unlock, {}) }) }) },
  { path: "/rotate", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Rotate, {}) }) }) },
  { path: "/organize", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Organize, {}) }) }) },
  { path: "/pdf-to-jpg", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(PDFToJPG, {}) }) }) },
  { path: "/jpg-to-pdf", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(JPGToPDF, {}) }) }) },
  { path: "/sign", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Sign, {}) }) }) },
  { path: "/edit", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(Edit, {}) }) }) }
];
{
  ReactGA.initialize("G-SV9Q7DEW95");
}
const router = createBrowserRouter(routes);
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(RouterProvider, { router }) }) }));
} else {
  ReactDOM.createRoot(rootElement).render(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(RouterProvider, { router }) }) })
  );
}
export {
  ClientOnly as C,
  SEO as S
};
