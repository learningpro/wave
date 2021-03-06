// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { XCombobox, Combobox } from './combobox'
import * as T from './qd'
import { initializeIcons } from '@fluentui/react'

const name = 'combobox'
const comboboxProps: Combobox = { name }
describe('Combobox.tsx', () => {
  beforeAll(() => initializeIcons())
  beforeEach(() => { T.qd.args[name] = null })

  it('Renders data-test attr', () => {
    const { queryByTestId } = render(<XCombobox model={comboboxProps} />)
    expect(queryByTestId(name)).toBeInTheDocument()
  })

  it('Does not display combobox when visible is false', () => {
    const { queryByTestId } = render(<XCombobox model={{ ...comboboxProps, visible: false }} />)
    expect(queryByTestId(name)).toBeInTheDocument()
    expect(queryByTestId(name)).not.toBeVisible()
  })

  it('Sets args - init - value not specified', () => {
    render(<XCombobox model={comboboxProps} />)
    expect(T.qd.args[name]).toBeNull()
  })
  it('Sets args - init - value specified', () => {
    render(<XCombobox model={{ ...comboboxProps, value: 'Test' }} />)
    expect(T.qd.args[name]).toBe('Test')
  })

  it('Sets args - selection', () => {
    const { container, getByText } = render(<XCombobox model={{ ...comboboxProps, choices: ['Choice1', 'Choice2', 'Choice3'] }} />)
    fireEvent.click(container.querySelector('button')!)
    fireEvent.click(getByText('Choice1'))

    expect(T.qd.args[name]).toBe('Choice1')
  })
})