/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import * as localforage from "localforage";

interface GithubUserTypings {
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

class GithubUser {
    userData: GithubUserTypings

    constructor(userData: GithubUserTypings) {
        this.userData = userData
        return this
    }

    getUsername(): string {
        return this.userData.login
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

    getCreationDate(): Date {
        return new Date(this.userData.created_at)
    }

    getPublicEmail(): string | null {
        return this.userData.email
    }

    // @ts-ignore
    getEvents(): GithubEvent[] | null {
        fetch(this.userData.events_url)
            .then(res => res.json())
            .then(res => {
                return [...res.map((e: any) => {
                    return new GithubEvent(e)
                })]
            })
            .catch(e => {
                console.error(e)
                return null
            })
    }

    // @ts-ignore
    getFollowers(): GithubFollower[] | null {
        fetch(this.userData.followers_url)
            .then(res => res.json())
            .then(res => {
                return [...res.map((e: any) => {
                    return new GithubFollower(e)
                })]
            })
            .catch(e => {
                console.error(e)
                return null
            })
    }

    getName(): string {
        return this.userData.name
    }
}

class GithubFollower {
    follower: GithubFollowerTypings
    constructor(follower: GithubFollowerTypings) {
        this.follower = follower
        return this
    }

    getUsername(): string {
        return this.follower.login
    }

    getId(): number {
        return this.follower.id
    }

    getNodeId(): string {
        return this.follower.node_id
    }

    getAvatar(): string {
        return this.follower.avatar_url
    }

    getGravatarId(): string {
        return this.follower.gravatar_id
    }

    // @ts-ignore
    getUser(): GithubUser | null {
        fetch(this.follower.url)
            .then(req => req.json())
            .then(user => {
                return new GithubUser(user)
            })
            .catch(e => {
                console.error(e)
                return null
            })
    }

    isGithubAdmin(): boolean {
        return this.follower.site_admin
    }
}

interface GithubFollowerTypings {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: "User",
    site_admin: boolean
}

interface GithubEventTypings {
    id: string,
    type: "WatchEvent" | "PushEvent", // FIXME: add other variants
    actor: {
        id: number, login: string, display_login: string, gravatar_id: string, url: string, avatar_url: string
    },
    repo: { id: number, name: string, url: string },
    payload: {
        action: "started" // FIXME: add other variants
    },
    public: boolean,
    created_at: string
}

class GithubEvent {
    event: GithubEventTypings
    constructor(eventData: GithubEventTypings) {
        this.event = eventData
        return this
    }
}

// @ts-ignore
export default function GetCurrentUser(): User {
    localforage.getItem("githubUser").then(data => {
        return data
    }).catch(e => {
        console.error(e)
        return null
    })
}