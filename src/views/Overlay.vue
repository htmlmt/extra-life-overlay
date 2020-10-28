<template>
    <div class="dd-u-flex dd-u-min-h-screen dd-u-items-center dd-u-justify-center">
        <div
            class="dd-u-text-center dd-u-w-full"
            v-if="!participantID"
        >
            <p class="u-mb-16 u-text-16">
                Please update the URL with your participant ID:<br> 
                https://extralifeoverlay.netlify.app/?participantID=<strong>[your participant ID]</strong>
            </p>

            <p class="u-text-16">
                If you're on a team and want to show only<br> your thermo and most-recent donation,<br> add <strong>&view=participant</strong> to the URL.
            </p>
        </div>

        <div
            v-if="participantID"
            class="dd-u-flex dd-u-flex-col dd-u-h-screen dd-u-justify-between"
        >
            <main class="u-p-sm u-shadow dd-u-bg-white dd-u-relative dd-u-z-10">
                <Thermo :resource="resource" />
            </main>
            
            <footer class="u-p-sm dd-u-flex dd-u-items-center dd-u-justify-between dd-u-overflow-hidden">
                <div
                    id="fundraiser"
                    class="u-mr-16 dd-u-flex dd-u-items-center"
                >
                    <div class="u-mr-16">
                        <img
                            :alt="name"
                            :src="avatarImageURL"
                        >
                    </div>
                    
                    <p class="dd-u-truncate">
                        {{ participant.displayName }} <span v-if="team.name">playing for {{ team.name }}</span>
                    </p>
                </div>

                <div
                    v-if="lastDonation"
                    class="dd-u-overflow-hidden"
                >
                    <p class="dd-u-truncate">
                        <span>{{ lastDonation.displayName }}</span><span v-if="!lastDonation.displayName">Anonymous</span> donated <span v-if="lastDonation.amount"><strong>{{ lastDonation.amount | formatMoney }}</strong></span> <span v-if="lastDonation.recipientName">to {{ lastDonation.recipientName }}</span> {{ lastDonation.createdDateUTC | moment('from') }}
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import Thermo from '@/components/Thermo';

let store;

let participantInterval;
let teamInterval;
let lastDonationInterval;
let lastDonationTimeInterval;

import { mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: {
        Thermo,
    },
    data() {
        return {
            avatarImageURL: '',
            lastDonationTime: false,
            name: '',
            participantName: '',
            resource: {},
            participantID: '',
            thermoShown: 'team',
        }
    },
    computed: {
        ...mapGetters([
            'lastDonation',
            'participant',
            'team',
        ]),
    },
    watch: {
        participant: function(participant) {
            if (participant.teamID) {
                clearInterval(teamInterval);
                
                store.dispatch('getTeam', {
                    teamID: participant.teamID,
                });

                teamInterval = setInterval(function() {
                    store.dispatch('getTeam', {
                        teamID: participant.teamID,
                    });
                }, 15000);
                
                if (this.$route.query.view === 'participant') {
                    this.avatarImageURL = this.participant.avatarImageURL;
                    this.name = this.participant.displayName;
                    this.resource = this.participant;
                }
            } else {
                clearInterval(lastDonationInterval);
                
                store.dispatch('getLastDonation', {
                    participantID: participant.participantID,
                });
                
                lastDonationInterval = setInterval(function() {
                    store.dispatch('getLastDonation', {
                        participantID: participant.participantID,
                    });
                }, 15000);
                
                this.avatarImageURL = this.participant.avatarImageURL;
                this.name = this.participant.displayName;
                this.resource = this.participant;
            }
        },
        team: function(team) {
            clearInterval(lastDonationInterval);
            
            const data = this;
            
            if (this.$route.query.view !== 'participant') {
                this.avatarImageURL = this.team.avatarImageURL;
                this.name = this.team.name;
                this.resource = this.team;
                
                store.dispatch('getLastDonation', {
                    teamID: team.teamID,
                });
                
                lastDonationInterval = setInterval(function() {
                    store.dispatch('getLastDonation', {
                        teamID: team.teamID,
                    });
                }, 15000);
            } else {
                store.dispatch('getLastDonation', {
                    participantID: data.participant.participantID,
                });
                
                lastDonationInterval = setInterval(function() {
                    store.dispatch('getLastDonation', {
                        participantID: data.participant.participantID,
                    });
                }, 15000);
            }
        },
    },
    created() {
        clearInterval(participantInterval);
        
        const params = this.$route.query;
        store = this.$store;
        
        if (params.participantID) {
            this.participantID = params.participantID;

            store.dispatch('getParticipant', {
                name: this.participantName,
            });
            
            const data = this;
            
            participantInterval = setInterval(function() {
                store.dispatch('getParticipant', {
                    participantID: data.participant.participantID,
                });
            }, 15000);
        }
    },
}
</script>

<style lang="scss">
    body {
        background-color: transparent;
        margin: 0;
    }

    * {
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
    }

    p {
        color: #1a4c6d;
        font-size: 1.75vw;
        margin: 0;
    }
    
    img {
        width: 100%;
    }
    
    footer {
        background-color: #f6f7fb;
    }
    
    #fundraiser img {
        border: 3px solid #1a4c6d;
        display: block;
        width: 5vw;
    }
    
    .u-shadow {
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    }
    
    .u-text-16 {
        font-size: 16px;
    }
    
    .u-p-sm {
        padding: 1vw;
    }
    
    .u-max-w-320 {
        max-width: 320px;
    }
    
    .u-mb-sm {
        margin-bottom: 0.5vw;
    }
    
    .u-mb-md {
        margin-bottom: 1vw;
    }
    
    .u-mb-16 {
        margin-bottom: 16px;
    }
    
    .u-mr-16 {
        margin-right: 1rem;
    }
</style>
