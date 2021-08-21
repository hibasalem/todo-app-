import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  Label,
  NumericInput,
  Switch,
} from '@blueprintjs/core';
import { settingsContext } from '../context/settings/context';
import { AuthContext } from '../context/auth/context';
import { If, Else, Then } from 'react-if';
import Auth from './Auth';

export default function SettingsForm() {
  const settings = useContext(settingsContext);
  const [itemsNum, setItemsNum] = useState(settings.itemsPerPage);
  const [showCompleted, setShowCompleted] = useState(settings.show);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setItemsNum(settings.itemsPerPage);
  }, [settings.itemsPerPage]);

  const handleItems = (e) => {
    e.preventDefault();
    settings.setItemsPerPage(Number(e.target.itemPerPage.value));
    settings.setShow(e.target.showIncomplete.value);

    localStorage.setItem(
      'settings',
      JSON.stringify({
        itemPerPage: e.target.itemPerPage.value,
        show: e.target.showIncomplete.value,
      })
    );
  };

  return (
    <If condition={auth.loggedIn}>
      <Then>
        <Auth capability="update">
          <div className="secItem">
            <Card>
              <h3>choose your settings</h3>
              <form onSubmit={handleItems}>
                <FormGroup labelFor="text-input" labelInfo="(required)">
                  <Label>
                    number of items per page
                    <NumericInput
                      onChange={(e) => {
                        setItemsNum(e.target.value);
                      }}
                      name="itemPerPage"
                      id="number-input"
                      placeholder="items per page , defult 3"
                      max={5}
                      min={1}
                      required
                      // value={settings.itemsPerPage}
                    />
                  </Label>

                  <Label>
                    <Switch
                      defaultChecked={true}
                      name="showIncomplete"
                      label="show complated items"
                      onChange={(e) => {
                        setShowCompleted(e.target.value);
                      }}
                    />
                  </Label>

                  <Button type="submit">Save changes</Button>
                </FormGroup>
              </form>
            </Card>
          </div>
        </Auth>
      </Then>
    </If>
  );
}
