/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import * as localforage from "localforage";

interface UserTypings {
    avatar_url: string,
    bio: string,
    blog: string | null,
    company: string,
    created_at: string,
    email: string | null,
    events_url: string,
    followers: number,
    followers_url: string,
    following: number,
    following_url: string,
    gists_url: string,
    gravatar_id: string,
    hireable: boolean | null,
    html_url: string,
    id: number,
    location: string | null,
    login: string,
    name: string,
    node_id: string,
    organizations_url: string,
    plan: {
        collaborators: number, name: string, private_repos: number, space: number
    },
    public_gists: number,
    public_repos: number,
    received_events_url: string,
    repos_url: string,
    site_admin: boolean,
    starred_url: string,
    subscriptions_url: string,
    twitter_username: string | null,
    type: "User" | "Organization",
    updated_at: string,
    url: string
}

class User {
    userData: UserTypings

    constructor(userData: UserTypings) {
        this.userData = userData
        return this
    }

    getName(): string {
        return this.userData.name
    }

    getAvatar(): string {
        return this.userData.avatar_url
    }

    getBio(): string {
        return this.userData.bio
    }

    getBlogUrl(): string | null {
        return this.userData.blog
    }

    getCompany(): string {
        return this.userData.company
    }

    getCreationTime(): Date {
        return new Date(this.userData.created_at)
    }

    getPublicEmail(): string | null {
        return this.userData.email
    }

    // @ts-ignore
    getEvents(): Event[] {
        fetch(this.userData.events_url)
            .then(res => res.json())
            .then(res => {
                return [...res.map((e: any) => {
                    return new Event(e)
                })]
            })
            .catch(e => {
                console.error(e)
                return null
            })
    }
}

interface EventTypings {
    id: string,
    type: "WatchEvent" | "PushEvent", // FIXME: add other varients
    actor: {
        id: number, login: string, display_login: string, gravatar_id: string, url: string, avatar_url: string
    },
    repo: { id: number, name: string, url: string },
    payload: {
        action: "started" // FIXME: add other varients
    },
    public: boolean,
    created_at: string
}

class Event {
    constructor(eventData: object[]) {
        return this
    }
}

// @ts-ignore
export default function GetUser(): User {
    localforage.getItem("githubUser").then(data => {
        return data
    }).catch(e => {
        console.error(e)
        return null
    })
}