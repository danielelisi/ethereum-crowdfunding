import React, { Component } from 'react';
import { Card, Button, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import web3 from '../ethereum/web3';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns }
    }

    state = {
        warningVisible: true
    };

    renderCampaigns() {
        const items = this.props.campaigns.map( (address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    handleDismiss = () => {
        this.setState({ warningVisible: false })

        console.log(this.state.warningVisible);
    }

    render() {
        return(
            <Layout>
                <div>
                    <Message
                        warning={this.state.warningVisible}
                        hidden={!this.state.warningVisible}
                        onDismiss={this.handleDismiss}
                        header="MetaMask Setup"
                        content={web3.warningMessage}
                    />
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                content="Create Campaign"
                                icon="add circle"
                                primary // primary={true}
                                labelPosition='left'
                                floated="right"
                            />
                        </a>
                    </Link>

                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;