---
id: checkbox
title: Checkbox
---

Checkbox UI Component

Checkbox component

Based on [Ant Design Checkbox](https://ant.design/components/checkbox/)

## Checkbox default

<iframe src="/storybook-static/iframe.html?id=components-checkbox--default"></iframe>

## Checkbox single

<iframe src="/storybook-static/iframe.html?id=components-checkbox--single"></iframe>

## Checkbox group

<iframe src="/storybook-static/iframe.html?id=components-checkbox--group"></iframe>

## API

### Props

#### Checkbox

| Property       | Description                                                           | Type              | Default |
| -------------- | --------------------------------------------------------------------- | ----------------- | ------- |
| description    | checkbox description                                                  | string            | -       |
| errorText      | error message, if provided sets error state on checkbox               | string            | -       |
| autoFocus      | get focus when component mounted                                      | boolean           | false   |
| checked        | Specifies whether the checkbox is selected.                           | boolean           | false   |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean           | false   |
| disabled       | Disable checkbox                                                      | boolean           | false   |
| indeterminate  | indeterminate checked state of checkbox                               | boolean           | false   |
| onChange       | The callback function that is triggered when the state changes.       | Function(e:Event) | -       |

#### Checkbox Group

| Property     | Description                                                     | Type                   | Default |
| ------------ | --------------------------------------------------------------- | ---------------------- | ------- |
| defaultValue | Default selected value                                          | string\[]              | \[]     |
| disabled     | Disable all checkboxes                                          | boolean                | false   |
| name         | The `name` property of all `input[type="checkbox"]` children    | string                 | -       |
| options      | Specifies options                                               | string\[]              | \[]     |
| value        | Used for setting the currently selected value.                  | string\[]              | \[]     |
| onChange     | The callback function that is triggered when the state changes. | Function(checkedValue) | -       |

### Methods

#### Checkbox

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |