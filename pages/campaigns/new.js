import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minContribution: '',
        errorMessage: '',
        isLoading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minContribution)
                .send({
                    from: accounts[0]
            });

            Router.pushRoute('/');
        } catch (err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minContribution}
                            onChange={event => this.setState({minContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.isLoading} primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;