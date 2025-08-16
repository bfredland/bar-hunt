// Bar Scavenger Hunt Application with Enhanced Leaderboard and FIXED Input
class ScavengerHuntGame {
    constructor() {
        // Default game configuration
        this.defaultCategories = {
            "photo_challenges": {
                "name": "Photo Challenges",
                "items": [
                    {"id": "selfie_bartender", "name": "Take a selfie with the bartender", "points": 10},
                    {"id": "photo_hat", "name": "Photo with someone wearing a hat", "points": 5},
                    {"id": "birth_month", "name": "Picture with a person who shares your birth month", "points": 15},
                    {"id": "photo_dj", "name": "Photo with the DJ/band", "points": 20},
                    {"id": "group_funny", "name": "Group photo with all team members making funny faces", "points": 10},
                    {"id": "photo_tattoo", "name": "Picture with someone with a tattoo", "points": 5},
                    {"id": "photo_red", "name": "Photo with a person wearing red", "points": 5},
                    {"id": "bathroom_selfie", "name": "Selfie in the bathroom mirror", "points": 10},
                    {"id": "left_handed", "name": "Photo with someone who is left-handed", "points": 15},
                    {"id": "anniversary_couple", "name": "Picture with a couple celebrating an anniversary", "points": 25}
                ]
            },
            "social_challenges": {
                "name": "Social Challenges",
                "items": [
                    {"id": "free_drink", "name": "Get someone to buy you a drink", "points": 30},
                    {"id": "happy_birthday", "name": "Convince a stranger to sing happy birthday", "points": 20},
                    {"id": "phone_number", "name": "Get a phone number from someone", "points": 25},
                    {"id": "high_five", "name": "High-five 5 different people", "points": 10},
                    {"id": "dance_together", "name": "Get someone to do a dance with you", "points": 15},
                    {"id": "same_school", "name": "Find someone who went to your school", "points": 20},
                    {"id": "tell_joke", "name": "Get a stranger to tell you a joke", "points": 15},
                    {"id": "hometown", "name": "Find someone who has been to your hometown", "points": 20},
                    {"id": "arm_wrestle", "name": "Get someone to arm wrestle you", "points": 15},
                    {"id": "free_shot", "name": "Convince someone to buy you a shot", "points": 35}
                ]
            },
            "item_collection": {
                "name": "Item Collection",
                "items": [
                    {"id": "napkin_number", "name": "Collect a napkin with a phone number", "points": 15},
                    {"id": "business_card", "name": "Get a business card", "points": 10},
                    {"id": "coaster", "name": "Collect a coaster from each bar visited", "points": 5},
                    {"id": "odd_receipt", "name": "Get a receipt with an odd total", "points": 10},
                    {"id": "sugar_packet", "name": "Collect a sugar packet", "points": 5},
                    {"id": "straw", "name": "Get a straw from each location", "points": 5},
                    {"id": "matchbook", "name": "Collect a matchbook", "points": 15},
                    {"id": "menu", "name": "Get a menu from the bar", "points": 10},
                    {"id": "toothpick", "name": "Collect a toothpick", "points": 5},
                    {"id": "signed_item", "name": "Get something signed by the bartender", "points": 25}
                ]
            },
            "skill_challenges": {
                "name": "Skill/Performance Challenges",
                "items": [
                    {"id": "karaoke", "name": "Sing karaoke (solo)", "points": 40},
                    {"id": "pushups", "name": "Do 10 push-ups in the bar", "points": 25},
                    {"id": "chug_beer", "name": "Chug a beer in under 30 seconds", "points": 30},
                    {"id": "win_game", "name": "Win a game of pool/darts", "points": 35},
                    {"id": "cartwheel", "name": "Do a cartwheel (safely)", "points": 25},
                    {"id": "make_laugh", "name": "Tell a joke that makes someone laugh", "points": 20},
                    {"id": "trivia", "name": "Win a trivia question", "points": 25},
                    {"id": "dance_60", "name": "Dance for 60 seconds straight", "points": 20},
                    {"id": "impression", "name": "Do an impression that makes someone laugh", "points": 25},
                    {"id": "drinking_game", "name": "Win a drinking game", "points": 40}
                ]
            },
            "bonus_challenges": {
                "name": "Rare/Bonus Challenges",
                "items": [
                    {"id": "same_birthday", "name": "Find someone with your exact birthday", "points": 50},
                    {"id": "bar_cheer", "name": "Get the entire bar to cheer for you", "points": 75},
                    {"id": "celebrity_photo", "name": "Take a photo with a celebrity/local celebrity", "points": 100},
                    {"id": "social_media", "name": "Get featured on the bar's social media", "points": 50},
                    {"id": "free_appetizer", "name": "Get a free appetizer from the kitchen", "points": 60},
                    {"id": "dj_request", "name": "Convince the DJ to play your song request", "points": 40},
                    {"id": "video_interview", "name": "Get interviewed by someone making a video", "points": 75},
                    {"id": "name_game", "name": "Find someone who knows your full name (without telling them)", "points": 100},
                    {"id": "stage_perform", "name": "Get on stage/perform with the band", "points": 100},
                    {"id": "custom_drink", "name": "Get the bartender to create a drink named after you", "points": 75}
                ]
            }
        };

        // Game state
        this.gameState = {
            isActive: false,
            isEnded: false,
            startTime: null,
            endTime: null,
            winner: null
        };

        // Game data
        this.players = [];
        this.categories = JSON.parse(JSON.stringify(this.defaultCategories));
        this.currentPlayer = null;
        this.pendingChallenge = null;
        this.expandedPlayers = new Set(); // Track which players are expanded

        console.log('ScavengerHuntGame constructor called');
        this.init();
    }

    init() {
        console.log('Initializing game...');
        
        // Wait for DOM to be fully loaded before binding events
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.setupUI();
                this.setupInputDebugging();
            });
        } else {
            this.bindEvents();
            this.setupUI();
            this.setupInputDebugging();
        }
        
        console.log('Game initialization started');
    }

    setupUI() {
        this.showView('admin-view');
        this.updateGameStatus();
        this.updatePlayerCount();
        this.renderConfigurationSummary();
        this.updateConfigTextarea();
        this.renderPlayersList();
        console.log('UI setup complete');
    }

    setupInputDebugging() {
        const input = document.getElementById('player-name-input');
        const debugInfo = document.getElementById('input-debug');
        
        if (!input || !debugInfo) {
            console.warn('Input debugging elements not found');
            return;
        }

        // Enhanced input event logging and debugging
        const updateDebugInfo = () => {
            debugInfo.innerHTML = `
                Input Status: ${input.disabled ? 'Disabled' : 'Enabled'} | 
                Focus: ${document.activeElement === input ? 'Yes' : 'No'} | 
                Value: "${input.value}" | 
                Length: ${input.value.length}
            `;
        };

        // Add comprehensive input event listeners for debugging
        input.addEventListener('focus', () => {
            console.log('Input focused');
            updateDebugInfo();
        });

        input.addEventListener('blur', () => {
            console.log('Input blurred');
            updateDebugInfo();
        });

        input.addEventListener('input', (e) => {
            console.log('Input event:', e.target.value);
            updateDebugInfo();
        });

        input.addEventListener('keydown', (e) => {
            console.log('Keydown event:', e.key, 'Input value:', e.target.value);
            updateDebugInfo();
        });

        input.addEventListener('keypress', (e) => {
            console.log('Keypress event:', e.key, 'Input value:', e.target.value);
            updateDebugInfo();
        });

        input.addEventListener('keyup', (e) => {
            console.log('Keyup event:', e.key, 'Input value:', e.target.value);
            updateDebugInfo();
        });

        // Initial debug info
        updateDebugInfo();
        
        // Auto-focus the input field
        setTimeout(() => {
            input.focus();
            console.log('Input auto-focused');
            updateDebugInfo();
        }, 100);
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Admin controls - these prevent default
        this.addButtonHandler('start-game-btn', 'click', () => this.startGame());
        this.addButtonHandler('end-game-btn', 'click', () => this.endGame());
        this.addButtonHandler('reset-game-btn', 'click', () => this.resetGame());
        this.addButtonHandler('export-results-btn', 'click', () => this.exportResults());

        // Player management - button prevents default, input does NOT
        this.addButtonHandler('add-player-btn', 'click', () => this.addPlayer());
        
        // FIXED: Properly handle input events without preventDefault
        this.setupPlayerNameInput();

        // Configuration
        this.addButtonHandler('toggle-config-btn', 'click', () => this.toggleConfigEditor());
        this.addButtonHandler('save-config-btn', 'click', () => this.saveConfiguration());
        this.addButtonHandler('reset-config-btn', 'click', () => this.resetConfiguration());

        // Navigation
        this.addButtonHandler('view-leaderboard-btn', 'click', () => this.showLeaderboard());
        this.addButtonHandler('show-leaderboard-btn', 'click', () => this.showLeaderboard());
        this.addButtonHandler('close-leaderboard-btn', 'click', () => this.closeLeaderboard());
        this.addButtonHandler('back-to-admin-btn', 'click', () => this.showView('admin-view'));
        this.addButtonHandler('switch-player-btn', 'click', () => this.showPlayerSelection());

        // Leaderboard controls
        this.addButtonHandler('expand-all-btn', 'click', () => this.expandAllPlayers());
        this.addButtonHandler('collapse-all-btn', 'click', () => this.collapseAllPlayers());

        // Modal controls
        this.addButtonHandler('close-winner-modal-btn', 'click', () => this.hideWinnerModal());
        this.addButtonHandler('start-new-game-btn', 'click', () => this.startNewGame());
        this.addButtonHandler('confirm-yes-btn', 'click', () => this.confirmChallenge());
        this.addButtonHandler('confirm-no-btn', 'click', () => this.cancelChallenge());

        console.log('Event binding complete');
    }

    // NEW: Separate input handling that doesn't interfere with text entry
    setupPlayerNameInput() {
        const playerInput = document.getElementById('player-name-input');
        if (!playerInput) {
            console.error('Player name input not found');
            return;
        }

        console.log('Setting up player name input with proper event handling');

        // Handle Enter key press ONLY - allow all other keys to work normally
        playerInput.addEventListener('keypress', (e) => {
            console.log('Player input keypress:', e.key, 'Current value:', e.target.value);
            
            if (e.key === 'Enter') {
                console.log('Enter key pressed, adding player');
                e.preventDefault(); // Only prevent default for Enter
                this.addPlayer();
            }
            // For all other keys, do NOT call preventDefault - let them work normally
        });

        // Monitor input changes for debugging
        playerInput.addEventListener('input', (e) => {
            console.log('Player input value changed to:', e.target.value);
        });

        // Focus event for debugging
        playerInput.addEventListener('focus', (e) => {
            console.log('Player input focused');
        });

        // Ensure the input is enabled and focusable
        playerInput.disabled = false;
        playerInput.readOnly = false;
        playerInput.tabIndex = 0;
        
        console.log('Player name input setup complete');
    }

    // Button event handler - only prevents default for buttons
    addButtonHandler(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, (e) => {
                // Only prevent default for button clicks
                if (element.tagName === 'BUTTON' || event === 'click') {
                    e.preventDefault();
                }
                handler(e);
            });
            console.log(`Button handler added to ${elementId}`);
        } else {
            console.warn(`Element ${elementId} not found for event binding`);
        }
    }

    // Game Management
    startGame() {
        console.log('Starting game...', this.players.length, 'players');
        
        if (this.players.length === 0) {
            alert('Please add at least one player before starting the game.');
            return;
        }

        this.gameState.isActive = true;
        this.gameState.isEnded = false;
        this.gameState.startTime = new Date();
        this.gameState.winner = null;

        // Reset all player scores and completed challenges
        this.players.forEach(player => {
            player.score = 0;
            player.completedChallenges = [];
            player.categoryScores = {};
            Object.keys(this.categories).forEach(categoryKey => {
                player.categoryScores[categoryKey] = 0;
            });
        });

        console.log('Game state updated:', this.gameState);
        this.updateGameStatus();
        this.addStartPlayingButton();
        
        alert('Game started! Players can now join by clicking the "Join Game" button.');
    }

    endGame() {
        console.log('Ending game...');
        
        this.gameState.isActive = false;
        this.gameState.isEnded = true;
        this.gameState.endTime = new Date();

        // Determine winner
        const sortedPlayers = [...this.players].sort((a, b) => b.score - a.score);
        this.gameState.winner = sortedPlayers[0] || null;

        console.log('Game ended. Winner:', this.gameState.winner);
        this.updateGameStatus();
        this.showWinnerModal();
    }

    resetGame() {
        console.log('Resetting game...');
        
        if (confirm('Are you sure you want to reset the game? This will clear all progress.')) {
            this.gameState = {
                isActive: false,
                isEnded: false,
                startTime: null,
                endTime: null,
                winner: null
            };

            this.players.forEach(player => {
                player.score = 0;
                player.completedChallenges = [];
                player.categoryScores = {};
            });

            this.currentPlayer = null;
            this.expandedPlayers.clear();
            this.updateGameStatus();
            this.removeStartPlayingButton();
            this.showView('admin-view');
            console.log('Game reset complete');
        }
    }

    startNewGame() {
        console.log('Starting new game...');
        this.resetGame();
        this.hideWinnerModal();
    }

    // Player Management
    addPlayer() {
        console.log('Adding player...');
        
        const input = document.getElementById('player-name-input');
        if (!input) {
            console.error('Player name input not found');
            return;
        }

        const name = input.value.trim();
        console.log('Player name from input:', `"${name}"`);

        if (!name) {
            alert('Please enter a player name.');
            input.focus(); // Refocus the input
            return;
        }

        if (this.players.some(player => player.name.toLowerCase() === name.toLowerCase())) {
            alert('A player with this name already exists.');
            input.value = ''; // Clear invalid input
            input.focus(); // Refocus the input
            return;
        }

        if (this.players.length >= 25) {
            alert('Maximum of 25 players allowed.');
            input.focus(); // Refocus the input
            return;
        }

        const player = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: name,
            score: 0,
            completedChallenges: [],
            categoryScores: {}
        };

        // Initialize category scores
        Object.keys(this.categories).forEach(categoryKey => {
            player.categoryScores[categoryKey] = 0;
        });

        this.players.push(player);
        console.log('Player added successfully:', player);
        console.log('Total players:', this.players.length);
        
        // Clear the input and refocus it
        input.value = '';
        input.focus();
        
        this.renderPlayersList();
        this.updatePlayerCount();
        
        // Show success feedback
        const debugInfo = document.getElementById('input-debug');
        if (debugInfo) {
            debugInfo.innerHTML = `✅ Player "${name}" added successfully! Total: ${this.players.length} players`;
            setTimeout(() => {
                this.setupInputDebugging(); // Reset debug info
            }, 2000);
        }
    }

    removePlayer(playerId) {
        console.log('Removing player:', playerId);
        this.players = this.players.filter(player => player.id !== playerId);
        this.expandedPlayers.delete(playerId);
        this.renderPlayersList();
        this.updatePlayerCount();
    }

    renderPlayersList() {
        console.log('Rendering players list...', this.players.length, 'players');
        
        const container = document.getElementById('players-list');
        if (!container) {
            console.error('Players list container not found');
            return;
        }
        
        container.innerHTML = '';

        this.players.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-card';
            
            const playerName = document.createElement('span');
            playerName.className = 'player-name';
            playerName.textContent = player.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-player-btn';
            removeBtn.innerHTML = '&times;';
            removeBtn.type = 'button';
            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.removePlayer(player.id);
            });
            
            card.appendChild(playerName);
            card.appendChild(removeBtn);
            container.appendChild(card);
        });
        
        console.log('Players list rendered');
    }

    updatePlayerCount() {
        console.log('Updating player count...');
        
        const countElement = document.getElementById('player-count');
        if (countElement) {
            countElement.textContent = `${this.players.length} players added`;
            console.log('Player count updated to:', this.players.length);
        } else {
            console.error('Player count element not found');
        }
    }

    // Player Selection and Game Views
    showPlayerSelection() {
        console.log('Showing player selection...');
        
        if (!this.gameState.isActive) {
            alert('The game must be started before players can join.');
            return;
        }

        this.renderPlayerSelection();
        this.showView('player-select-view');
    }

    renderPlayerSelection() {
        console.log('Rendering player selection...');
        
        const container = document.getElementById('player-selection-grid');
        if (!container) {
            console.error('Player selection container not found');
            return;
        }
        
        container.innerHTML = '';

        this.players.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-select-card';
            card.addEventListener('click', () => this.selectPlayer(player.id));
            card.innerHTML = `
                <div class="player-select-name">${player.name}</div>
                <div class="player-select-score">${player.score} points</div>
            `;
            container.appendChild(card);
        });
    }

    selectPlayer(playerId) {
        console.log('Selecting player:', playerId);
        this.currentPlayer = this.players.find(player => player.id === playerId);
        if (this.currentPlayer) {
            this.showPlayerView();
        } else {
            console.error('Player not found:', playerId);
        }
    }

    showPlayerView() {
        console.log('Showing player view...');
        
        if (!this.currentPlayer) {
            console.error('No current player selected');
            return;
        }

        const playerNameEl = document.getElementById('player-name-display');
        const playerScoreEl = document.getElementById('player-score');
        
        if (playerNameEl) playerNameEl.textContent = this.currentPlayer.name;
        if (playerScoreEl) playerScoreEl.textContent = this.currentPlayer.score;

        this.renderChallenges();
        this.updateProgress();
        this.showView('player-view');
    }

    // Challenge Management
    renderChallenges() {
        console.log('Rendering challenges...');
        
        const container = document.getElementById('challenges-container');
        if (!container) {
            console.error('Challenges container not found');
            return;
        }
        
        container.innerHTML = '';

        Object.keys(this.categories).forEach(categoryKey => {
            const category = this.categories[categoryKey];
            const categoryElement = this.createCategoryElement(categoryKey, category);
            container.appendChild(categoryElement);
        });
    }

    createCategoryElement(categoryKey, category) {
        const completedCount = category.items.filter(item => 
            this.currentPlayer.completedChallenges.some(completed => completed.challengeId === item.id)
        ).length;

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'challenge-category';
        categoryDiv.innerHTML = `
            <div class="challenge-category-header">
                <div class="challenge-category-title">${category.name}</div>
                <div class="challenge-category-stats">${completedCount}/${category.items.length} completed</div>
            </div>
            <div class="challenge-items"></div>
        `;

        const itemsContainer = categoryDiv.querySelector('.challenge-items');
        
        category.items.forEach(item => {
            const itemElement = this.createChallengeItemElement(item, categoryKey);
            itemsContainer.appendChild(itemElement);
        });

        return categoryDiv;
    }

    createChallengeItemElement(item, categoryKey) {
        const isCompleted = this.currentPlayer.completedChallenges.some(completed => completed.challengeId === item.id);
        
        const itemDiv = document.createElement('div');
        itemDiv.className = `challenge-item ${isCompleted ? 'completed' : ''}`;
        
        if (!isCompleted) {
            itemDiv.addEventListener('click', () => {
                this.showChallengeConfirmation(item, categoryKey);
            });
        }

        itemDiv.innerHTML = `
            <div class="challenge-content">
                <div class="challenge-name">${item.name}</div>
            </div>
            <div class="points-badge">${item.points} pts</div>
        `;

        return itemDiv;
    }

    showChallengeConfirmation(challenge, categoryKey) {
        console.log('Showing challenge confirmation:', challenge);
        
        this.pendingChallenge = { ...challenge, categoryKey };
        
        const challengeNameEl = document.getElementById('confirm-challenge-name');
        const challengePointsEl = document.getElementById('confirm-challenge-points');
        
        if (challengeNameEl) challengeNameEl.textContent = challenge.name;
        if (challengePointsEl) challengePointsEl.textContent = `+${challenge.points} pts`;
        
        this.showModal('confirmation-modal');
    }

    confirmChallenge() {
        console.log('Confirming challenge...');
        
        if (!this.pendingChallenge || !this.currentPlayer) return;

        const completedChallenge = {
            challengeId: this.pendingChallenge.id,
            categoryId: this.pendingChallenge.categoryKey,
            challengeName: this.pendingChallenge.name,
            points: this.pendingChallenge.points,
            completedAt: new Date().toISOString(),
            category: this.categories[this.pendingChallenge.categoryKey].name
        };

        // Add to completed challenges
        this.currentPlayer.completedChallenges.push(completedChallenge);
        
        // Add points to total score
        this.currentPlayer.score += this.pendingChallenge.points;
        
        // Add points to category score
        if (!this.currentPlayer.categoryScores[this.pendingChallenge.categoryKey]) {
            this.currentPlayer.categoryScores[this.pendingChallenge.categoryKey] = 0;
        }
        this.currentPlayer.categoryScores[this.pendingChallenge.categoryKey] += this.pendingChallenge.points;
        
        console.log('Challenge completed. New score:', this.currentPlayer.score);
        
        // Update display
        const playerScoreEl = document.getElementById('player-score');
        if (playerScoreEl) playerScoreEl.textContent = this.currentPlayer.score;
        
        // Re-render challenges and update progress
        this.renderChallenges();
        this.updateProgress();
        
        this.hideModal('confirmation-modal');
        this.pendingChallenge = null;
    }

    cancelChallenge() {
        console.log('Cancelling challenge...');
        this.hideModal('confirmation-modal');
        this.pendingChallenge = null;
    }

    updateProgress() {
        if (!this.currentPlayer) return;

        const totalChallenges = this.getTotalChallengeCount();
        const completedChallenges = this.currentPlayer.completedChallenges.length;
        const progressPercent = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

        const progressText = document.getElementById('progress-text');
        const progressFill = document.getElementById('progress-fill');
        
        if (progressText) {
            progressText.textContent = `${completedChallenges}/${totalChallenges} completed`;
        }
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
        
        console.log('Progress updated:', `${completedChallenges}/${totalChallenges} (${progressPercent}%)`);
    }

    getTotalChallengeCount() {
        return Object.values(this.categories).reduce((total, category) => total + category.items.length, 0);
    }

    // Enhanced Leaderboard
    showLeaderboard() {
        console.log('Showing leaderboard...');
        this.renderLeaderboard();
        this.showView('leaderboard-view');
    }

    closeLeaderboard() {
        console.log('Closing leaderboard...');
        if (this.currentPlayer) {
            this.showView('player-view');
        } else {
            this.showView('admin-view');
        }
    }

    expandAllPlayers() {
        console.log('Expanding all players...');
        this.players.forEach(player => {
            this.expandedPlayers.add(player.id);
        });
        this.renderLeaderboard();
    }

    collapseAllPlayers() {
        console.log('Collapsing all players...');
        this.expandedPlayers.clear();
        this.renderLeaderboard();
    }

    togglePlayerExpansion(playerId) {
        console.log('Toggling player expansion:', playerId);
        if (this.expandedPlayers.has(playerId)) {
            this.expandedPlayers.delete(playerId);
        } else {
            this.expandedPlayers.add(playerId);
        }
        this.renderLeaderboard();
    }

    renderLeaderboard() {
        console.log('Rendering enhanced leaderboard...');
        
        const container = document.getElementById('leaderboard-content');
        if (!container) {
            console.error('Leaderboard container not found');
            return;
        }
        
        const sortedPlayers = [...this.players].sort((a, b) => b.score - a.score);
        console.log('Sorted players:', sortedPlayers);

        container.innerHTML = '';

        if (sortedPlayers.length === 0) {
            container.innerHTML = '<p class="text-center text-secondary">No players yet</p>';
            return;
        }

        sortedPlayers.forEach((player, index) => {
            const rank = index + 1;
            const item = this.createLeaderboardItem(player, rank);
            container.appendChild(item);
        });
        
        console.log('Enhanced leaderboard rendered');
    }

    createLeaderboardItem(player, rank) {
        const isExpanded = this.expandedPlayers.has(player.id);
        
        let rankClass = '';
        if (rank === 1) rankClass = 'first';
        else if (rank === 2) rankClass = 'second';
        else if (rank === 3) rankClass = 'third';

        const item = document.createElement('div');
        item.className = `leaderboard-item ${isExpanded ? 'expanded' : ''}`;
        
        // Create header
        const header = document.createElement('div');
        header.className = 'leaderboard-header';
        header.addEventListener('click', () => this.togglePlayerExpansion(player.id));
        
        header.innerHTML = `
            <div class="leaderboard-main-info">
                <div class="leaderboard-rank ${rankClass}">#${rank}</div>
                <div class="leaderboard-player">
                    <div class="leaderboard-name">${player.name}</div>
                    <div class="leaderboard-progress">${player.completedChallenges.length}/${this.getTotalChallengeCount()} challenges completed</div>
                </div>
            </div>
            <div class="leaderboard-score">${player.score}</div>
            <div class="leaderboard-expand-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
            </div>
        `;

        // Create expandable details
        const details = document.createElement('div');
        details.className = 'leaderboard-details';
        details.innerHTML = this.createPlayerDetailsHTML(player);

        item.appendChild(header);
        item.appendChild(details);
        
        return item;
    }

    createPlayerDetailsHTML(player) {
        const totalChallenges = this.getTotalChallengeCount();
        const completedCount = player.completedChallenges.length;
        const completionPercentage = totalChallenges > 0 ? Math.round((completedCount / totalChallenges) * 100) : 0;

        // Calculate category breakdown
        const categoryBreakdown = Object.keys(this.categories).map(categoryKey => {
            const category = this.categories[categoryKey];
            const categoryCompleted = player.completedChallenges.filter(challenge => 
                challenge.categoryId === categoryKey
            ).length;
            const categoryTotal = category.items.length;
            const categoryPoints = player.categoryScores[categoryKey] || 0;
            const progressPercent = categoryTotal > 0 ? (categoryCompleted / categoryTotal) * 100 : 0;

            return {
                name: category.name,
                completed: categoryCompleted,
                total: categoryTotal,
                points: categoryPoints,
                progressPercent: Math.round(progressPercent)
            };
        });

        // Generate achievement badges
        const achievements = this.getPlayerAchievements(player);

        return `
            <div class="leaderboard-details-content">
                <!-- Overall Stats -->
                <div class="leaderboard-stats">
                    <div class="stat-card">
                        <div class="stat-value">${player.score}</div>
                        <div class="stat-label">Total Points</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${completedCount}</div>
                        <div class="stat-label">Challenges Done</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${completionPercentage}%</div>
                        <div class="stat-label">Completion Rate</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${categoryBreakdown.filter(cat => cat.completed > 0).length}</div>
                        <div class="stat-label">Categories Active</div>
                    </div>
                </div>

                <!-- Category Breakdown -->
                <div class="category-breakdown">
                    <h4>Category Progress</h4>
                    ${categoryBreakdown.map(category => `
                        <div class="category-item">
                            <div class="category-name">${category.name}</div>
                            <div class="category-progress">
                                <div class="category-stats">${category.completed}/${category.total}</div>
                                <div class="progress-bar-small">
                                    <div class="progress-fill-small" style="width: ${category.progressPercent}%"></div>
                                </div>
                                <div class="category-points">${category.points} pts</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Achievement Badges -->
                ${achievements.length > 0 ? `
                    <div class="achievement-badges">
                        ${achievements.map(achievement => `
                            <span class="achievement-badge ${achievement.class}">${achievement.name}</span>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Completed Challenges -->
                ${player.completedChallenges.length > 0 ? `
                    <div class="completed-challenges">
                        <h5>Completed Challenges (${player.completedChallenges.length})</h5>
                        <div class="challenge-list">
                            ${player.completedChallenges
                                .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
                                .map(challenge => `
                                    <div class="completed-challenge-item">
                                        <div>
                                            <span class="challenge-check">✓</span>
                                            ${challenge.challengeName}
                                            <span class="challenge-time">${this.formatTime(challenge.completedAt)}</span>
                                        </div>
                                        <span class="challenge-points">+${challenge.points}</span>
                                    </div>
                                `).join('')}
                        </div>
                    </div>
                ` : '<p class="text-center text-secondary">No challenges completed yet</p>'}
            </div>
        `;
    }

    getPlayerAchievements(player) {
        const achievements = [];
        
        // Category master - completed all challenges in a category
        Object.keys(this.categories).forEach(categoryKey => {
            const category = this.categories[categoryKey];
            const categoryCompleted = player.completedChallenges.filter(challenge => 
                challenge.categoryId === categoryKey
            ).length;
            
            if (categoryCompleted === category.items.length) {
                achievements.push({
                    name: `${category.name} Master`,
                    class: 'category-master'
                });
            }
        });

        // High scorer - top score
        const allScores = this.players.map(p => p.score).sort((a, b) => b - a);
        if (allScores.length > 0 && player.score === allScores[0] && player.score > 0) {
            achievements.push({
                name: 'Top Scorer',
                class: 'high-scorer'
            });
        }

        // Completionist - completed 80% or more
        const totalChallenges = this.getTotalChallengeCount();
        const completionRate = totalChallenges > 0 ? (player.completedChallenges.length / totalChallenges) : 0;
        if (completionRate >= 0.8) {
            achievements.push({
                name: 'Completionist',
                class: 'completionist'
            });
        }

        return achievements;
    }

    formatTime(timestamp) {
        try {
            const date = new Date(timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return 'Recently';
        }
    }

    // Configuration Management
    toggleConfigEditor() {
        console.log('Toggling config editor...');
        
        const editor = document.getElementById('config-editor');
        const summary = document.getElementById('config-summary');
        const button = document.getElementById('toggle-config-btn');

        if (!editor || !summary || !button) {
            console.error('Config elements not found');
            return;
        }

        if (editor.classList.contains('hidden')) {
            editor.classList.remove('hidden');
            summary.classList.add('hidden');
            button.textContent = 'Hide Editor';
            this.updateConfigTextarea();
            console.log('Config editor shown');
        } else {
            editor.classList.add('hidden');
            summary.classList.remove('hidden');
            button.textContent = 'Edit JSON';
            console.log('Config editor hidden');
        }
    }

    updateConfigTextarea() {
        const textarea = document.getElementById('config-textarea');
        if (textarea) {
            textarea.value = JSON.stringify(this.categories, null, 2);
        }
    }

    saveConfiguration() {
        console.log('Saving configuration...');
        
        const textarea = document.getElementById('config-textarea');
        if (!textarea) return;
        
        try {
            const newConfig = JSON.parse(textarea.value);
            
            if (!this.validateConfiguration(newConfig)) {
                alert('Invalid configuration format. Please check your JSON.');
                return;
            }
            
            this.categories = newConfig;
            this.renderConfigurationSummary();
            this.toggleConfigEditor();
            
            alert('Configuration saved successfully!');
            console.log('Configuration saved');
        } catch (error) {
            alert('Invalid JSON format. Please check your syntax.');
            console.error('JSON parse error:', error);
        }
    }

    resetConfiguration() {
        console.log('Resetting configuration...');
        
        if (confirm('Are you sure you want to reset to default configuration?')) {
            this.categories = JSON.parse(JSON.stringify(this.defaultCategories));
            this.updateConfigTextarea();
            this.renderConfigurationSummary();
            console.log('Configuration reset to default');
        }
    }

    validateConfiguration(config) {
        if (typeof config !== 'object' || !config) return false;
        
        for (const [key, category] of Object.entries(config)) {
            if (!category.name || !category.items || !Array.isArray(category.items)) {
                return false;
            }
            
            for (const item of category.items) {
                if (!item.id || !item.name || typeof item.points !== 'number') {
                    return false;
                }
            }
        }
        
        return true;
    }

    renderConfigurationSummary() {
        console.log('Rendering configuration summary...');
        
        const container = document.getElementById('config-summary');
        if (!container) return;
        
        container.innerHTML = '';

        Object.entries(this.categories).forEach(([key, category]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'config-category';
            categoryDiv.innerHTML = `
                <div class="config-category-title">${category.name}</div>
                <div class="config-category-count">${category.items.length} challenges</div>
            `;
            container.appendChild(categoryDiv);
        });
    }

    // Winner Modal
    showWinnerModal() {
        console.log('Showing winner modal...');
        
        const modal = document.getElementById('winner-modal');
        const announcement = document.getElementById('winner-announcement');
        const leaderboard = document.getElementById('final-leaderboard');

        if (!modal || !announcement || !leaderboard) {
            console.error('Winner modal elements not found');
            return;
        }

        if (this.gameState.winner) {
            announcement.innerHTML = `
                <div class="winner-announcement">
                    <div class="celebration-emoji">🎉🏆🎉</div>
                    <div class="winner-name winner-celebration">${this.gameState.winner.name}</div>
                    <div class="winner-score">${this.gameState.winner.score} points</div>
                    <p>Congratulations! You are the Scavenger Hunt Champion!</p>
                </div>
            `;
        } else {
            announcement.innerHTML = `
                <div class="winner-announcement">
                    <div class="celebration-emoji">🎉</div>
                    <p>Game Complete!</p>
                </div>
            `;
        }

        // Render final leaderboard
        const sortedPlayers = [...this.players].sort((a, b) => b.score - a.score);
        leaderboard.innerHTML = sortedPlayers.slice(0, 5).map((player, index) => `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">#${index + 1}</div>
                <div class="leaderboard-player">
                    <div class="leaderboard-name">${player.name}</div>
                </div>
                <div class="leaderboard-score">${player.score}</div>
            </div>
        `).join('');

        this.showModal('winner-modal');
    }

    hideWinnerModal() {
        this.hideModal('winner-modal');
    }

    // Utility Methods
    showView(viewId) {
        console.log('Showing view:', viewId);
        
        document.querySelectorAll('.view').forEach(view => {
            view.classList.add('hidden');
        });
        
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            console.log('View shown:', viewId);
        } else {
            console.error('View not found:', viewId);
        }
    }

    showModal(modalId) {
        console.log('Showing modal:', modalId);
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        } else {
            console.error('Modal not found:', modalId);
        }
    }

    hideModal(modalId) {
        console.log('Hiding modal:', modalId);
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    updateGameStatus() {
        console.log('Updating game status...', this.gameState);
        
        const statusElement = document.getElementById('game-status');
        const startBtn = document.getElementById('start-game-btn');
        const endBtn = document.getElementById('end-game-btn');
        const exportBtn = document.getElementById('export-results-btn');

        if (!statusElement || !startBtn || !endBtn || !exportBtn) {
            console.error('Game status elements not found');
            return;
        }

        if (this.gameState.isActive) {
            statusElement.textContent = 'Active';
            statusElement.className = 'status status--success';
            startBtn.disabled = true;
            endBtn.disabled = false;
            exportBtn.disabled = true;
            console.log('Game status set to Active');
        } else if (this.gameState.isEnded) {
            statusElement.textContent = 'Ended';
            statusElement.className = 'status status--error';
            startBtn.disabled = false;
            endBtn.disabled = true;
            exportBtn.disabled = false;
            console.log('Game status set to Ended');
        } else {
            statusElement.textContent = 'Not Started';
            statusElement.className = 'status status--info';
            startBtn.disabled = false;
            endBtn.disabled = true;
            exportBtn.disabled = true;
            console.log('Game status set to Not Started');
        }
    }

    addStartPlayingButton() {
        console.log('Adding start playing button...');
        
        const existingBtn = document.getElementById('start-playing-btn');
        if (existingBtn) {
            console.log('Start playing button already exists');
            return;
        }

        const container = document.querySelector('#admin-view .card:last-child .card__body');
        if (!container) {
            console.error('Container for start playing button not found');
            return;
        }
        
        const button = document.createElement('button');
        button.id = 'start-playing-btn';
        button.className = 'btn btn--primary';
        button.textContent = 'Join Game';
        button.type = 'button';
        button.style.marginRight = 'var(--space-8)';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Join game button clicked');
            this.showPlayerSelection();
        });
        
        container.insertBefore(button, container.firstChild);
        console.log('Start playing button added');
    }

    removeStartPlayingButton() {
        const button = document.getElementById('start-playing-btn');
        if (button) {
            button.remove();
            console.log('Start playing button removed');
        }
    }

    exportResults() {
        console.log('Exporting enhanced results...');
        
        const results = {
            gameInfo: {
                startTime: this.gameState.startTime,
                endTime: this.gameState.endTime,
                winner: this.gameState.winner?.name || null,
                totalChallenges: this.getTotalChallengeCount()
            },
            players: this.players.map(player => ({
                name: player.name,
                score: player.score,
                completedChallenges: player.completedChallenges.length,
                categoryBreakdown: player.categoryScores,
                completionRate: Math.round((player.completedChallenges.length / this.getTotalChallengeCount()) * 100),
                detailedChallenges: player.completedChallenges.map(challenge => ({
                    name: challenge.challengeName,
                    category: challenge.category,
                    points: challenge.points,
                    completedAt: challenge.completedAt
                }))
            })).sort((a, b) => b.score - a.score),
            categories: Object.keys(this.categories).length,
            categoryStats: Object.entries(this.categories).map(([key, category]) => ({
                name: category.name,
                totalChallenges: category.items.length,
                totalPoints: category.items.reduce((sum, item) => sum + item.points, 0)
            }))
        };

        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `scavenger-hunt-detailed-results-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('Enhanced results exported');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing enhanced game with FIXED input...');
    window.game = new ScavengerHuntGame();
    console.log('Enhanced game instance created and stored in window.game');
});

// Auto-refresh leaderboard every 10 seconds when visible
setInterval(() => {
    if (window.game) {
        const leaderboardView = document.getElementById('leaderboard-view');
        if (leaderboardView && !leaderboardView.classList.contains('hidden')) {
            window.game.renderLeaderboard();
        }
    }
}, 10000);